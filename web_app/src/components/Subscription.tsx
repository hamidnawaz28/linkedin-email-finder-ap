import { NextPage } from "next";
import { Seo } from "@components/seo";
import { useTranslation } from "react-i18next";
import { Box, Button, Radio, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { auth } from "@firebase";
import { getUserQuota } from "@firebase/api";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { setUsersData } from "@firebase/api";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Seo
        description=""
        pageTitle="Home"
        contentTitle=""
        pageUrl=""
        tags={[""]}
      />
      <main>
        <SubscriptionCard />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;

const plans = [
  {
    planName: "Trial",
    price: 0,
    tagline: "Upto 10 emails only",
  },
  {
    planName: "Premium",
    price: 10,
    tagline: "Unlimited emails",
  },
];

const SubscriptionCard = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [authorized, setAuthorized] = useState<any>(null)
  const [quota, setQuota] = useState(0);
  const router = useRouter()
  const [showPaypal, setShowPaypal] = useState(false)

  const onProceedHandle = async () => {
    if (authorized) {
      if (selectedPlan == plans[0].planName) {
        await setUsersData(authorized.email, { package: 'trial', quota: 10, subscriptionId: '', token: uuidv4() })
        toast.success("Congratulations, You are now on trial membership")
        router.push('/dashboard')
      } else {
        setShowPaypal(true)
      }
    }
    else {
      toast.error('Please create an account or login first')
      router.push('/auth')
    }
    const trialPlan = plans[0].planName;
    const premiumPlan = plans[1].planName;
  };

  const onManageSubscription = async () => { };

  const updateQuota = async () => {
    if (auth.currentUser?.email) {
      const quota = await getUserQuota(auth.currentUser.email);
      setQuota(quota);
    }
  };


  useEffect(() => {
    updateQuota();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthorized(user)
      } else {
        setAuthorized(null)
        setShowPaypal(false)
      }
    });
  }, []);

  return (
    <Box id='subcription'>
      <Box sx={{ width: "75%", margin: 'auto' }}>
        {
          showPaypal ? <Box sx={[{
            widht: '100%',
            '& .paypal-button-container': {
              maxWidth: '100%'
            }
          }]}>
            <Button onClick={() => setShowPaypal(false)}>Back</Button>
            <PayPalScriptProvider options={{ "client-id": "Abz3mjZatyTYoc2Q9FrAqcP8IxFqZeNUjnM3RZg78HUKPM0htUC8PSFctofg_kdhRuzXAGHzCqhmDCB3", vault: true, currency: "USD" }}  >
              <PayPalButtons style={{ layout: "vertical", color: 'blue', label: 'subscribe', }}
                createSubscription={(data, actions) => {
                  return actions.subscription.create({
                    'plan_id': 'P-0R274721M9612235XMSDJTKI',
                  });
                }}
                onCancel={(data, actions: any) => {
                  console.log(data);
                }}
                onApprove={(data, actions: any) => {
                  return actions.subscription.get().then(async (details: any) => {
                    const subscriptionId = details.id
                    const startTime = details.start_time
                    await setUsersData(authorized.email, { package: 'premium', quota: 100000, subscriptionId, token: uuidv4() })
                    toast.success("Congratulations, You are now a premium member")
                    router.push('/dashboard')
                  });
                }} />
            </PayPalScriptProvider>

          </Box> : <Box>
            <Box
              sx={{
                padding: "20px 0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{ fontColor: "white", fontWeight: "bold", fontSize: 20 }}
              >
                Choose a plan
              </Typography>{" "}
              <Typography sx={{ fontColor: "white", opacity: 0.7 }}>
                Select a plan that best fit your needs
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gridGap: 20,
              }}
            >
              {plans.map((plan: CardItemInterface, key: number) => {
                return (
                  <CardItem
                    {...plan}
                    key={key}
                    selectedPlan={selectedPlan}
                    setSelectedPlan={setSelectedPlan}
                  />
                );
              })}
            </Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%", margin: "40px 0px" }}
              disabled={selectedPlan == ""}
              onClick={onProceedHandle}
            >
              Proceed
            </Button>
          </Box>
        }

      </Box>

    </Box>
  );
};

interface CardItemInterface {
  planName: string;
  price?: number;
  tagline: string;
}

interface CardItemExtendeInterface extends CardItemInterface {
  selectedPlan: string;
  setSelectedPlan: any;
}

const CardItem = ({
  planName,
  price,
  tagline,
  selectedPlan,
  setSelectedPlan,
}: CardItemExtendeInterface) => {
  return (
    <Box
      sx={[
        {
          backgroundColor: "background.paper",
          color: "common.black",
          padding: "10px 15px",
          width: "100%",
          height: "400px",
          borderRadius: "10px",
          "&:hover": {
            cursor: "pointer",
          },
        },
      ]}
      onClick={() => setSelectedPlan(planName)}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "centre",
          flexDirection: "column",
        }}
      >
        <Radio checked={selectedPlan === planName} />

        <Typography fontWeight={"bold"}>{planName}</Typography>
        <Typography sx={{ fontColor: "white", opacity: 0.8 }}>
          {tagline}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            height: "100%",
          }}
        >
          <Typography fontWeight={"bold"} sx={{ fontSize: 25 }}>
            ${price}
          </Typography>
          <Typography
            sx={{
              fontColor: "white",
              opacity: 0.8,
            }}
          >
            /month
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
