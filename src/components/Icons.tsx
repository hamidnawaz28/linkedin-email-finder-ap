import { Box } from '@mui/material'
import { SvgIconProps } from '@mui/material/SvgIcon'
import React from 'react'

const GptIcon = (props: SvgIconProps) => {
  return (
    <Box sx={{ width: 30 }}>
      <svg
        {...props}
        width="100%"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2_18)">
          <path
            d="M1 411C0.999993 308.645 0.999993 206.29 1.33583 103.784C2.08303 103.127 2.71356 102.684 2.8726 102.11C4.95235 94.6027 6.37934 86.8578 9.09852 79.595C19.8396 50.9062 39.3028 29.6402 66.0413 15.0586C77.0885 9.03405 88.8611 4.69644 101.447 2.90156C102.043 2.81657 102.486 1.65839 103 1C205.355 1 307.71 1 410.249 1.3498C410.94 2.10411 411.386 2.72213 411.959 2.88079C419.464 4.95867 427.174 6.45625 434.471 9.0979C456.006 16.8936 473.589 30.4413 487.581 48.3558C499.792 63.9908 507.854 81.7155 511.097 101.463C511.195 102.064 512.342 102.492 513 103C513 219.021 513 335.043 512.692 451.333C511.175 448.51 510.347 445.194 508.687 442.367C503.74 433.941 497.549 427.638 486.391 428.863C479.971 429.568 473.38 428.621 466.927 429.147C463.688 429.412 459.731 430.471 457.594 432.642C453.143 437.166 449.686 442.669 445.616 448.038C443.901 443.167 442.121 437.672 439.974 432.323C439.434 430.976 437.755 429.197 436.543 429.152C428.751 428.865 420.943 429.006 412.425 429.006C412.425 431.742 412.449 434.031 412.421 436.319C412.302 445.81 412.59 455.33 411.918 464.783C411.278 473.796 405.251 479.574 397.479 479.937C389.182 480.324 382.813 475.219 381.012 466.323C380.324 462.929 380.189 459.387 380.143 455.908C380.027 447.131 380.105 438.352 380.105 429.41C374.77 429.41 370.076 429.41 365.015 429.41C365.015 438.634 364.909 447.445 365.06 456.251C365.134 460.559 365.196 464.964 366.108 469.141C369.389 484.163 382.16 494.176 397.054 493.827C412.002 493.477 424.066 483.404 426.607 468.274C427.7 461.763 427.311 455 427.564 448.351C427.629 446.654 427.574 444.952 427.574 442.143C432.269 451.477 436.448 459.524 440.342 467.706C441.343 469.811 442.188 472.464 441.834 474.66C439.765 487.474 437.319 500.227 435 513C324.312 513 213.624 513 102.758 512.655C101.911 511.885 101.286 511.196 100.565 511.074C78.9216 507.407 59.7934 497.997 43.487 483.727C21.927 464.859 7.59995 441.386 2.90876 412.633C2.80574 412.002 1.65957 411.541 1 411ZM425.749 205.111C427.243 193.779 426.951 182.509 424.418 171.343C412.928 120.692 366.24 88.632 314.509 95.9192C311.074 96.4031 308.482 96.2593 305.65 93.427C255.541 43.3053 171.242 61.1866 145.679 127.311C144.472 130.433 142.889 132.033 139.6 132.888C70.8051 150.783 43.9747 233.201 88.9726 288.409C90.9963 290.892 91.543 292.983 90.6362 296.056C86.4667 310.189 85.666 324.596 88.4661 339.054C98.7427 392.118 146.844 425.92 200.532 417.758C203.828 417.257 205.675 418.14 207.836 420.313C257.837 470.599 342.24 452.969 367.834 386.858C369.122 383.532 370.834 381.933 374.275 381.039C438.067 364.462 467.452 289.45 430.887 234.743C424.382 225.011 421.334 216.702 425.749 205.111Z"
            fill="#74AA9C"
          />
          <path
            d="M435.467 513C437.319 500.227 439.765 487.474 441.834 474.66C442.188 472.464 441.343 469.811 440.342 467.706C436.448 459.524 432.269 451.477 427.574 442.143C427.574 444.952 427.629 446.654 427.564 448.351C427.311 455 427.7 461.763 426.607 468.274C424.066 483.404 412.002 493.477 397.054 493.827C382.16 494.176 369.389 484.163 366.108 469.141C365.196 464.964 365.134 460.559 365.06 456.251C364.909 447.445 365.015 438.634 365.015 429.41C370.076 429.41 374.77 429.41 380.105 429.41C380.105 438.352 380.027 447.131 380.143 455.908C380.189 459.387 380.324 462.929 381.012 466.323C382.813 475.219 389.182 480.324 397.479 479.937C405.251 479.574 411.278 473.796 411.918 464.783C412.59 455.33 412.302 445.81 412.421 436.319C412.449 434.031 412.425 431.742 412.425 429.006C420.943 429.006 428.751 428.865 436.543 429.152C437.755 429.197 439.434 430.976 439.974 432.323C442.121 437.672 443.901 443.167 445.616 448.038C449.686 442.669 453.143 437.166 457.594 432.642C459.731 430.471 463.688 429.412 466.927 429.147C473.38 428.621 479.971 429.568 486.39 428.863C497.549 427.638 503.74 433.941 508.687 442.367C510.347 445.194 511.175 448.51 512.692 451.801C513 457.022 513 462.044 512.692 467.713C511.815 469.744 511.245 471.128 510.676 472.512C503.911 488.989 486.896 497.423 469.824 492.303C464.83 490.805 460.234 487.986 454.82 485.479C453.544 494.669 452.272 503.835 451 513C445.978 513 440.956 513 435.467 513ZM459.41 469.783C463.421 474.726 468.419 478.173 474.7 479.472C481.953 480.971 488.422 479.248 493.145 473.448C499.079 466.162 499.484 457.796 495.845 449.456C492.878 442.656 487.322 439.013 479.702 438.893C466.728 438.688 454.793 456.106 459.41 469.783Z"
            fill="#F4FCF5"
          />
          <path
            d="M451.469 513C452.272 503.835 453.544 494.669 454.82 485.479C460.234 487.986 464.83 490.805 469.824 492.303C486.896 497.423 503.911 488.989 510.676 472.512C511.245 471.128 511.815 469.744 512.692 468.18C513 482.938 513 497.877 513 513C492.646 513 472.292 513 451.469 513Z"
            fill="#75AB9D"
          />
          <path
            d="M425.673 205.544C421.334 216.702 424.382 225.011 430.887 234.743C467.452 289.449 438.067 364.462 374.275 381.039C370.834 381.933 369.122 383.532 367.834 386.858C342.24 452.969 257.837 470.599 207.836 420.313C205.675 418.14 203.828 417.257 200.532 417.758C146.844 425.92 98.7427 392.118 88.4661 339.054C85.666 324.596 86.4667 310.189 90.6363 296.056C91.543 292.983 90.9963 290.892 88.9726 288.409C43.9747 233.201 70.8051 150.783 139.6 132.888C142.889 132.033 144.472 130.433 145.679 127.311C171.242 61.1866 255.541 43.3053 305.65 93.4269C308.482 96.2593 311.074 96.403 314.509 95.9192C366.24 88.632 412.928 120.692 424.418 171.343C426.951 182.509 427.243 193.779 425.673 205.544ZM197.203 265.096C197.31 263.109 197.509 261.122 197.511 259.134C197.531 227.991 197.626 196.848 197.452 165.705C197.412 158.588 200.081 153.885 206.323 150.359C229.801 137.099 253.106 123.532 276.473 110.074C278.33 109.004 280.162 107.89 282.391 106.568C281.104 105.399 280.239 104.409 279.189 103.691C256.386 88.0999 231.947 84.8029 206.767 96.3433C181.658 107.851 166.569 128.096 165.152 155.818C163.641 185.388 164.566 215.083 164.567 244.724C164.567 246.09 165.581 248.062 166.72 248.726C176.625 254.492 186.667 260.024 197.203 265.096ZM387.645 225.847C364.584 212.533 341.397 199.428 318.552 185.753C313.08 182.479 309.137 182.325 303.857 185.84C295.916 191.125 287.391 195.532 278.447 200.698C280.777 202.133 282.282 203.11 283.834 204.007C310.785 219.572 337.651 235.289 364.761 250.573C371.744 254.51 374.499 259.554 374.407 267.478C374.096 294.284 374.289 321.097 374.289 347.908C374.289 349.825 374.289 351.743 374.289 354.581C377.366 353.307 379.507 352.561 381.525 351.566C431.631 326.859 435.328 258.055 387.645 225.847ZM349.128 288.5C349.128 285.669 348.705 282.762 349.204 280.022C351.045 269.914 347.295 263.686 337.672 259.712C330.422 256.719 323.883 252.002 316.126 247.534C316.126 250.424 316.126 252.191 316.126 253.958C316.124 285.261 315.95 316.566 316.244 347.866C316.316 355.497 313.488 360.247 306.945 363.938C283.175 377.346 259.591 391.083 235.944 404.709C234.452 405.569 233.022 406.537 231.09 407.753C233.076 409.243 234.46 410.423 235.976 411.397C259.716 426.651 284.662 429.204 309.876 416.213C335.016 403.26 348.252 381.805 348.994 353.435C349.552 332.137 349.12 310.813 349.128 288.5ZM128.199 367.275C151.589 394.897 188.479 402.067 219.89 384.576C243.9 371.206 267.607 357.288 291.319 343.392C293.015 342.398 294.543 339.607 294.612 337.599C294.949 327.777 294.783 317.938 294.743 308.105C294.738 306.883 294.429 305.662 294.2 303.99C291.921 305.253 290.168 306.19 288.448 307.183C261.76 322.592 234.998 337.874 208.447 353.515C201.639 357.525 195.794 357.699 188.92 353.628C165.558 339.796 141.954 326.372 118.433 312.81C116.908 311.931 115.303 311.193 113.603 310.322C109.669 329.339 114.909 349.811 128.199 367.275ZM214.5 325.003C221.158 321.133 227.816 317.264 235.142 313.006C232.572 311.458 231.033 310.496 229.461 309.589C202.504 294.044 175.609 278.388 148.534 263.051C141.973 259.335 139.089 254.45 139.146 246.94C139.352 219.969 139.226 192.994 139.226 166.021C139.226 164.102 139.226 162.184 139.226 159.395C136.185 160.66 134.001 161.362 132.011 162.426C107.597 175.478 93.6025 195.831 92.3051 223.438C90.9788 251.66 103.037 273.922 127.226 288.699C148.095 301.448 169.877 312.719 190.556 325.751C199.289 331.255 206.185 332.075 214.5 325.003ZM315.424 156.99C318.501 158.138 321.804 158.888 324.618 160.496C347.894 173.797 371.078 187.258 394.296 200.661C395.994 201.641 397.741 202.535 399.479 203.477C400.027 202.717 400.439 202.361 400.566 201.923C400.794 201.133 400.913 200.297 400.971 199.473C402.949 171.462 393.156 148.532 369.9 132.648C346.703 116.804 321.412 114.882 296.521 127.975C271.045 141.375 246.47 156.487 221.55 170.936C220.436 171.582 219.093 173.066 219.076 174.179C218.897 185.917 218.965 197.66 218.965 210.116C221.328 208.863 222.929 208.076 224.471 207.187C251.591 191.552 278.682 175.867 305.851 160.318C308.525 158.788 311.67 158.081 315.424 156.99ZM241.632 291.869C245.527 294.115 249.282 296.68 253.377 298.468C255.285 299.301 258.298 299.453 260.043 298.503C270.569 292.77 280.956 286.764 291.171 280.493C292.868 279.451 294.409 276.683 294.46 274.672C294.765 262.684 294.749 250.68 294.466 238.69C294.422 236.832 292.902 234.28 291.301 233.304C281.064 227.067 270.583 221.233 260.256 215.141C257.864 213.73 255.938 213.505 253.408 215.014C243.112 221.154 232.72 227.14 222.271 233.017C219.768 234.425 218.842 236.096 218.876 238.96C219.022 250.954 219.041 262.953 218.865 274.947C218.822 277.899 219.951 279.443 222.384 280.784C228.655 284.238 234.809 287.903 241.632 291.869Z"
            fill="#FEFEFE"
          />
          <path
            d="M459.199 469.465C454.793 456.106 466.728 438.688 479.702 438.893C487.322 439.013 492.878 442.655 495.845 449.456C499.484 457.796 499.079 466.162 493.145 473.448C488.422 479.247 481.953 480.971 474.7 479.472C468.419 478.173 463.421 474.726 459.199 469.465Z"
            fill="#76AB9D"
          />
          <path
            d="M196.936 265.361C186.667 260.024 176.625 254.492 166.72 248.726C165.581 248.062 164.567 246.09 164.567 244.724C164.566 215.083 163.641 185.388 165.152 155.818C166.569 128.096 181.658 107.851 206.767 96.3433C231.947 84.8029 256.386 88.0999 279.189 103.691C280.239 104.409 281.104 105.399 282.391 106.568C280.162 107.89 278.33 109.004 276.473 110.074C253.106 123.532 229.801 137.099 206.323 150.359C200.081 153.885 197.412 158.588 197.452 165.705C197.626 196.848 197.531 227.991 197.511 259.134C197.509 261.122 197.31 263.109 196.936 265.361Z"
            fill="#75AB9D"
          />
          <path
            d="M387.96 226.024C435.328 258.055 431.631 326.859 381.525 351.566C379.507 352.561 377.366 353.308 374.289 354.581C374.289 351.743 374.289 349.826 374.289 347.908C374.289 321.097 374.097 294.285 374.407 267.478C374.499 259.554 371.744 254.51 364.761 250.573C337.651 235.289 310.785 219.572 283.834 204.007C282.282 203.111 280.777 202.133 278.447 200.698C287.391 195.532 295.916 191.125 303.857 185.84C309.137 182.325 313.08 182.479 318.552 185.754C341.397 199.428 364.584 212.533 387.96 226.024Z"
            fill="#76AB9D"
          />
          <path
            d="M349.128 289C349.12 310.813 349.552 332.137 348.994 353.435C348.252 381.805 335.016 403.26 309.876 416.213C284.662 429.204 259.716 426.651 235.976 411.397C234.46 410.423 233.076 409.243 231.09 407.753C233.022 406.537 234.452 405.569 235.944 404.709C259.591 391.083 283.175 377.346 306.945 363.938C313.488 360.247 316.316 355.497 316.244 347.866C315.95 316.566 316.124 285.261 316.126 253.958C316.126 252.191 316.126 250.424 316.126 247.534C323.883 252.002 330.422 256.719 337.672 259.712C347.295 263.686 351.045 269.914 349.204 280.022C348.705 282.762 349.128 285.669 349.128 289Z"
            fill="#75AB9D"
          />
          <path
            d="M127.985 366.991C114.909 349.811 109.669 329.339 113.602 310.322C115.303 311.193 116.908 311.931 118.433 312.81C141.954 326.372 165.558 339.796 188.92 353.628C195.794 357.699 201.639 357.525 208.447 353.515C234.998 337.874 261.76 322.592 288.448 307.183C290.168 306.19 291.921 305.253 294.2 303.99C294.429 305.662 294.738 306.883 294.743 308.105C294.783 317.938 294.949 327.777 294.612 337.599C294.543 339.607 293.015 342.398 291.319 343.392C267.607 357.288 243.9 371.206 219.89 384.576C188.479 402.067 151.589 394.897 127.985 366.991Z"
            fill="#75AB9D"
          />
          <path
            d="M214.179 325.179C206.185 332.075 199.289 331.255 190.556 325.751C169.877 312.719 148.095 301.448 127.226 288.699C103.037 273.922 90.9788 251.66 92.3051 223.438C93.6025 195.831 107.597 175.478 132.011 162.426C134.001 161.362 136.185 160.66 139.226 159.395C139.226 162.184 139.226 164.102 139.226 166.021C139.226 192.994 139.352 219.969 139.146 246.94C139.089 254.45 141.973 259.335 148.534 263.051C175.609 278.388 202.504 294.044 229.461 309.589C231.033 310.496 232.572 311.458 235.142 313.006C227.816 317.264 221.158 321.133 214.179 325.179Z"
            fill="#75AB9D"
          />
          <path
            d="M315.01 156.991C311.67 158.081 308.525 158.788 305.851 160.318C278.682 175.867 251.591 191.552 224.471 207.187C222.929 208.076 221.328 208.863 218.965 210.116C218.965 197.66 218.897 185.917 219.076 174.179C219.093 173.067 220.436 171.582 221.55 170.936C246.47 156.487 271.045 141.375 296.521 127.975C321.412 114.882 346.703 116.804 369.9 132.648C393.156 148.532 402.949 171.463 400.971 199.473C400.913 200.297 400.794 201.133 400.566 201.923C400.439 202.361 400.027 202.717 399.479 203.477C397.741 202.535 395.994 201.641 394.296 200.661C371.078 187.258 347.894 173.797 324.618 160.496C321.804 158.888 318.501 158.138 315.01 156.991Z"
            fill="#75AB9D"
          />
          <path
            d="M241.321 291.676C234.809 287.903 228.655 284.238 222.384 280.784C219.951 279.443 218.822 277.899 218.865 274.947C219.041 262.953 219.022 250.954 218.876 238.96C218.842 236.096 219.768 234.425 222.271 233.017C232.72 227.14 243.112 221.154 253.408 215.014C255.939 213.505 257.864 213.73 260.257 215.141C270.583 221.233 281.064 227.067 291.301 233.304C292.902 234.28 294.422 236.832 294.466 238.69C294.749 250.68 294.765 262.684 294.46 274.672C294.409 276.683 292.868 279.451 291.171 280.493C280.956 286.764 270.569 292.771 260.043 298.503C258.298 299.453 255.285 299.301 253.377 298.468C249.282 296.68 245.527 294.115 241.321 291.676Z"
            fill="#75AB9D"
          />
        </g>
        <defs>
          <clipPath id="clip0_2_18">
            <rect width="512" height="512" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  )
}

export { GptIcon }
