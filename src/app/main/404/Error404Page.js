import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

function Error404Page() {
  return (
    // <div className="flex flex-col flex-1 items-center justify-center p-16">
    //   <div className="w-full max-w-3xl text-center">
    //     <motion.div
    //       initial={{ opacity: 0, scale: 0.6 }}
    //       animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
    //     >
    //       <Box
    //         component="svg"
    //         width="100%"
    //         height="100%"
    //         viewBox="0 0 1075 585"
    //         fill="none"
    //         preserveAspectRatio="xMidYMax slice"
    //         xmlns="http://www.w3.org/2000/svg"
    //         sx={{ color: 'secondary.main' }}
    //       >
    //         <g clipPath="url(#clip0)">
    //           <path
    //             d="M520.426 167.01C434.482 167.01 372.775 222.149 372.775 350.808C372.775 496.621 434.482 535.218 520.426 535.218C606.37 535.218 671.753 492.945 671.753 350.808C671.753 198.868 606.37 167.01 520.426 167.01ZM520.991 486.818C461.464 486.818 430.365 451.895 430.365 350.902C430.365 261.79 462.737 214.797 522.264 214.797C581.791 214.797 614.163 245.665 614.163 350.902C614.163 449.349 580.517 486.818 520.991 486.818Z"
    //             className="text-gray-800 dark:text-gray-600"
    //             fill="currentColor"
    //           />
    //           <path
    //             d="M321.311 433.517H285.777V328.877C285.777 323.32 283.569 317.989 279.639 314.059C275.709 310.129 270.379 307.922 264.821 307.922H256.495C253.743 307.922 251.018 308.464 248.475 309.517C245.933 310.57 243.623 312.113 241.677 314.059C239.731 316.005 238.187 318.315 237.134 320.858C236.081 323.4 235.539 326.125 235.539 328.877V433.517H135.309C133.247 433.517 131.22 432.984 129.425 431.97C127.629 430.955 126.127 429.494 125.062 427.728C123.998 425.962 123.408 423.951 123.35 421.89C123.292 419.829 123.768 417.788 124.731 415.965L230.814 215.184C232.136 212.681 232.938 209.936 233.17 207.114C233.402 204.293 233.061 201.453 232.165 198.768C231.27 196.082 229.84 193.605 227.961 191.487C226.082 189.37 223.793 187.654 221.233 186.445L214.971 183.488C210.108 181.192 204.549 180.853 199.444 182.541C194.338 184.23 190.077 187.816 187.542 192.558L58.1602 434.591C55.957 438.712 54.8043 443.314 54.8043 447.987V447.987C54.8043 451.719 55.5393 455.414 56.9673 458.861C58.3954 462.309 60.4885 465.441 63.1271 468.08C65.7658 470.719 68.8983 472.812 72.3459 474.24C75.7935 475.668 79.4885 476.403 83.2202 476.403H235.539V542.57C235.539 545.869 236.189 549.135 237.451 552.183C238.713 555.23 240.564 557.999 242.896 560.332C245.229 562.664 247.998 564.515 251.045 565.777C254.093 567.039 257.359 567.689 260.658 567.689H260.658C263.957 567.689 267.223 567.039 270.271 565.777C273.318 564.515 276.087 562.664 278.42 560.332C280.752 557.999 282.603 555.23 283.865 552.183C285.127 549.135 285.777 545.869 285.777 542.57V476.403H321.311C326.998 476.403 332.452 474.144 336.474 470.122C340.495 466.101 342.754 460.647 342.754 454.96V454.96C342.754 449.273 340.495 443.819 336.474 439.797C332.453 435.776 326.998 433.517 321.311 433.517V433.517Z"
    //             fill="currentColor"
    //           />
    //           <path
    //             d="M979.308 433.517H943.774V328.877C943.774 323.32 941.566 317.989 937.636 314.059C933.706 310.129 928.376 307.922 922.818 307.922H914.491C911.739 307.922 909.014 308.464 906.472 309.517C903.929 310.57 901.619 312.113 899.673 314.059C897.727 316.005 896.184 318.315 895.131 320.858C894.077 323.4 893.535 326.125 893.535 328.877V433.517H793.305C791.243 433.517 789.216 432.984 787.421 431.97C785.626 430.955 784.123 429.494 783.059 427.728C781.995 425.962 781.405 423.951 781.347 421.89C781.289 419.829 781.764 417.788 782.728 415.965L888.81 215.184C890.133 212.681 890.934 209.936 891.167 207.114C891.399 204.293 891.057 201.453 890.162 198.768C889.266 196.082 887.836 193.605 885.957 191.487C884.078 189.37 881.79 187.654 879.23 186.445L872.967 183.488C868.105 181.192 862.546 180.853 857.44 182.541C852.334 184.23 848.073 187.816 845.538 192.558L716.157 434.591C713.953 438.712 712.801 443.314 712.801 447.987V447.987C712.801 455.523 715.795 462.751 721.124 468.08C726.453 473.409 733.68 476.403 741.217 476.403H893.535V542.57C893.535 549.232 896.182 555.621 900.893 560.332C905.603 565.043 911.992 567.689 918.654 567.689V567.689C925.316 567.689 931.706 565.043 936.416 560.332C941.127 555.621 943.773 549.232 943.773 542.57V476.403H979.308C984.995 476.403 990.449 474.144 994.47 470.122C998.492 466.101 1000.75 460.647 1000.75 454.96V454.96C1000.75 449.273 998.492 443.819 994.47 439.797C990.449 435.776 984.995 433.517 979.308 433.517Z"
    //             fill="currentColor"
    //           />

    //           <path
    //             d="M1006.86 419.55C1009.89 420.651 1013.14 421.034 1016.34 420.667C1019.54 420.301 1022.62 419.196 1025.32 417.439C1028.02 415.683 1030.28 413.322 1031.91 410.544C1033.55 407.766 1034.51 404.647 1034.74 401.431C1034.96 398.216 1034.43 394.992 1033.2 392.015C1031.96 389.038 1030.05 386.388 1027.62 384.275C1025.19 382.161 1022.3 380.642 1019.17 379.837C1016.05 379.032 1012.79 378.962 1009.64 379.634L1010.16 390.347L1005.09 381.166C1000.11 383.503 996.271 387.72 994.404 392.889C993.741 394.699 993.338 396.595 993.207 398.519C992.887 403.032 994.048 407.527 996.512 411.322C998.976 415.117 1002.61 418.006 1006.86 419.55V419.55Z"
    //             fill="#57B894"
    //           />
    //           <path
    //             d="M1031.94 543.793C1030.15 534.683 1037.9 526.606 1045.56 521.357C1053.22 516.107 1062.17 510.949 1064.78 502.04C1068.53 489.236 1057.35 477.51 1048.64 467.398C1042.19 459.894 1036.64 451.65 1032.12 442.841C1030.31 439.308 1028.64 435.615 1028.17 431.674C1027.48 425.999 1029.31 420.351 1031.14 414.938C1037.26 396.903 1043.8 379.02 1050.77 361.288"
    //             className="text-gray-800 dark:text-gray-600"
    //             stroke="currentColor"
    //             strokeMiterlimit="10"
    //           />
    //           <path
    //             d="M1007.72 416.792C1010.75 417.893 1013.99 418.276 1017.2 417.909C1020.4 417.543 1023.47 416.438 1026.17 414.682C1028.88 412.925 1031.13 410.565 1032.77 407.787C1034.4 405.009 1035.37 401.889 1035.59 398.673C1035.82 395.458 1035.29 392.234 1034.06 389.257C1032.82 386.28 1030.91 383.63 1028.48 381.517C1026.04 379.403 1023.15 377.884 1020.03 377.079C1016.91 376.274 1013.64 376.204 1010.49 376.876L1011.01 387.589L1005.95 378.408C1000.97 380.745 997.128 384.962 995.262 390.131C994.599 391.941 994.196 393.837 994.064 395.761C993.745 400.274 994.905 404.769 997.369 408.564C999.833 412.359 1003.47 415.248 1007.72 416.792V416.792Z"
    //             className="text-gray-800 dark:text-gray-600"
    //             stroke="currentColor"
    //             strokeMiterlimit="10"
    //           />
    //           <path
    //             d="M1029.4 357.588C1030.59 354.308 1032.58 351.38 1035.2 349.073C1037.82 346.767 1040.97 345.157 1044.38 344.391L1046.09 354.574L1049.27 343.879C1053.68 343.944 1057.96 345.41 1061.48 348.064C1065 350.718 1067.59 354.423 1068.87 358.645C1070.15 362.866 1070.06 367.386 1068.6 371.551C1067.15 375.715 1064.41 379.31 1060.78 381.815C1057.15 384.32 1052.81 385.607 1048.4 385.489C1043.99 385.371 1039.73 383.854 1036.24 381.158C1032.75 378.462 1030.21 374.726 1028.98 370.49C1027.74 366.253 1027.89 361.735 1029.4 357.588H1029.4Z"
    //             fill="#57B894"
    //           />
    //           <path
    //             d="M1030.54 353.911C1031.73 350.631 1033.72 347.703 1036.34 345.396C1038.96 343.09 1042.12 341.479 1045.52 340.713L1047.23 350.897L1050.41 340.201C1054.82 340.267 1059.1 341.732 1062.62 344.387C1066.15 347.041 1068.74 350.746 1070.02 354.968C1071.3 359.189 1071.2 363.709 1069.75 367.873C1068.29 372.038 1065.55 375.633 1061.92 378.138C1058.29 380.643 1053.96 381.93 1049.55 381.812C1045.14 381.694 1040.88 380.177 1037.38 377.481C1033.89 374.785 1031.35 371.049 1030.12 366.813C1028.89 362.576 1029.04 358.058 1030.54 353.911H1030.54Z"
    //             className="text-gray-800 dark:text-gray-600"
    //             stroke="currentColor"
    //             strokeMiterlimit="10"
    //           />
    //           <path
    //             d="M1044.99 467.604C1049.8 469.347 1055.07 469.261 1059.82 467.363C1064.56 465.464 1068.44 461.886 1070.72 457.311C1072.99 452.735 1073.51 447.482 1072.16 442.553C1070.81 437.623 1067.7 433.362 1063.41 430.582L1060.97 438.801L1059.24 428.497C1059.22 428.489 1059.2 428.482 1059.18 428.477C1056.62 427.543 1053.89 427.125 1051.16 427.246C1048.42 427.367 1045.74 428.025 1043.27 429.182C1040.79 430.339 1038.56 431.973 1036.72 433.991C1034.87 436.008 1033.44 438.369 1032.51 440.94C1031.58 443.51 1031.16 446.238 1031.29 448.97C1031.41 451.701 1032.07 454.381 1033.23 456.857C1034.39 459.334 1036.02 461.557 1038.04 463.401C1040.06 465.245 1042.42 466.674 1044.99 467.604H1044.99Z"
    //             fill="#57B894"
    //           />
    //           <path
    //             d="M1045.98 463.88C1050.79 465.622 1056.06 465.536 1060.81 463.638C1065.55 461.74 1069.43 458.162 1071.71 453.586C1073.99 449.011 1074.5 443.758 1073.15 438.828C1071.8 433.899 1068.69 429.638 1064.4 426.857L1061.96 435.076L1060.23 424.772C1060.21 424.764 1060.19 424.758 1060.17 424.752C1057.61 423.818 1054.88 423.4 1052.15 423.521C1049.41 423.642 1046.73 424.3 1044.26 425.457C1041.78 426.615 1039.55 428.249 1037.71 430.266C1035.86 432.284 1034.43 434.645 1033.5 437.215C1032.57 439.785 1032.15 442.514 1032.28 445.245C1032.4 447.976 1033.06 450.656 1034.22 453.133C1035.38 455.609 1037.01 457.833 1039.03 459.677C1041.05 461.521 1043.41 462.949 1045.98 463.88H1045.98Z"
    //             className="text-gray-800 dark:text-gray-600"
    //             stroke="currentColor"
    //             strokeMiterlimit="10"
    //           />
    //           <path
    //             d="M1023.32 502.167C1024.15 506.867 1026.57 511.14 1030.17 514.27C1033.77 517.4 1038.34 519.195 1043.11 519.356C1047.88 519.517 1052.56 518.032 1056.37 515.152C1060.17 512.272 1062.87 508.171 1064.01 503.537C1065.15 498.903 1064.66 494.018 1062.63 489.701C1060.59 485.384 1057.14 481.897 1052.84 479.826C1048.54 477.755 1043.66 477.225 1039.02 478.326C1034.37 479.426 1030.25 482.09 1027.33 485.87L1036.61 499.826L1023.94 492.418C1022.95 495.572 1022.74 498.915 1023.32 502.167V502.167Z"
    //             fill="#57B894"
    //           />
    //           <path
    //             d="M1024.18 499.409C1025.01 504.109 1027.42 508.382 1031.03 511.512C1034.63 514.642 1039.2 516.437 1043.97 516.598C1048.74 516.759 1053.42 515.274 1057.22 512.394C1061.03 509.514 1063.73 505.413 1064.87 500.779C1066.01 496.145 1065.52 491.26 1063.49 486.943C1061.45 482.626 1058 479.139 1053.7 477.068C1049.4 474.997 1044.52 474.467 1039.87 475.568C1035.23 476.668 1031.1 479.332 1028.19 483.112L1037.46 497.068L1024.79 489.661C1023.81 492.814 1023.6 496.157 1024.18 499.409V499.409Z"
    //             className="text-gray-800 dark:text-gray-600"
    //             stroke="currentColor"
    //             strokeMiterlimit="10"
    //           />
    //           <path
    //             d="M9.00746 470.249C10.9978 470.972 13.1289 471.224 15.2329 470.983C17.337 470.743 19.3563 470.017 21.1319 468.862C22.9075 467.708 24.3908 466.157 25.4648 464.332C26.5388 462.507 27.1742 460.457 27.3208 458.345C27.4675 456.232 27.1215 454.114 26.3101 452.158C25.4987 450.202 24.244 448.461 22.645 447.073C21.0459 445.684 19.1463 444.686 17.0957 444.157C15.0451 443.628 12.8997 443.582 10.8285 444.024L11.1707 451.062L7.84085 445.03C4.57278 446.566 2.04805 449.336 0.821494 452.732C0.385892 453.922 0.121078 455.167 0.034953 456.431C-0.17523 459.397 0.586979 462.35 2.20607 464.843C3.82517 467.337 6.2129 469.234 9.00746 470.249V470.249Z"
    //             fill="#57B894"
    //           />
    //           <path
    //             d="M25.4837 551.879C24.3083 545.893 29.4017 540.587 34.4329 537.138C39.464 533.689 45.3427 530.3 47.0593 524.446C49.5264 516.034 42.1776 508.33 36.4579 501.686C32.2144 496.756 28.5702 491.34 25.6016 485.551C24.311 483.278 23.4319 480.794 23.0049 478.215C22.5539 474.486 23.7519 470.775 24.9588 467.219C28.9794 455.37 33.2782 443.62 37.8551 431.97"
    //             className="text-gray-800 dark:text-gray-600"
    //             stroke="currentColor"
    //             strokeMiterlimit="10"
    //           />
    //           <path
    //             d="M9.57064 468.437C11.5609 469.16 13.6921 469.412 15.7961 469.171C17.9001 468.931 19.9195 468.205 21.6951 467.05C23.4707 465.896 24.9539 464.345 26.0279 462.52C27.1019 460.695 27.7373 458.645 27.884 456.533C28.0307 454.42 27.6847 452.302 26.8733 450.346C26.0618 448.39 24.8072 446.649 23.2081 445.261C21.6091 443.872 19.7094 442.874 17.6589 442.345C15.6083 441.816 13.4628 441.77 11.3916 442.212L11.7339 449.25L8.40403 443.218C5.13595 444.754 2.61122 447.524 1.38467 450.92C0.949069 452.11 0.684259 453.355 0.598129 454.619C0.387932 457.585 1.15014 460.538 2.76923 463.031C4.38833 465.525 6.77607 467.422 9.57064 468.437V468.437Z"
    //             className="text-gray-800 dark:text-gray-600"
    //             stroke="currentColor"
    //             strokeMiterlimit="10"
    //           />
    //           <path
    //             d="M23.8124 429.539C24.5935 427.384 25.9044 425.46 27.6244 423.945C29.3444 422.429 31.4181 421.371 33.6545 420.868L34.7803 427.559L36.8677 420.532C39.7659 420.575 42.5754 421.537 44.8907 423.281C47.206 425.025 48.9071 427.46 49.7486 430.233C50.5901 433.007 50.5283 435.976 49.5723 438.712C48.6162 441.449 46.8152 443.81 44.4295 445.456C42.0437 447.102 39.1966 447.948 36.2991 447.87C33.4016 447.793 30.6038 446.796 28.3095 445.025C26.0152 443.254 24.3432 440.799 23.5349 438.016C22.7265 435.232 22.8237 432.264 23.8124 429.539V429.539Z"
    //             fill="#57B894"
    //           />
    //           <path
    //             d="M24.5632 427.123C25.3443 424.968 26.6552 423.044 28.3752 421.529C30.0952 420.013 32.169 418.955 34.4053 418.452L35.5312 425.143L37.6186 418.116C40.5168 418.158 43.3263 419.121 45.6415 420.865C47.9568 422.609 49.658 425.044 50.4995 427.817C51.3409 430.591 51.2792 433.56 50.3231 436.296C49.367 439.033 47.5661 441.394 45.1803 443.04C42.7946 444.686 39.9474 445.532 37.0499 445.454C34.1525 445.377 31.3546 444.38 29.0603 442.609C26.7661 440.838 25.094 438.383 24.2857 435.599C23.4774 432.816 23.5746 429.848 24.5632 427.123V427.123Z"
    //             className="text-gray-800 dark:text-gray-600"
    //             stroke="currentColor"
    //             strokeMiterlimit="10"
    //           />
    //           <path
    //             d="M34.0576 501.822C37.214 502.967 40.6813 502.91 43.7987 501.663C46.9162 500.416 49.4656 498.065 50.9612 495.059C52.4568 492.052 52.7939 488.601 51.9083 485.362C51.0227 482.124 48.9763 479.324 46.1592 477.497L44.5553 482.897L43.418 476.127C43.4067 476.122 43.3951 476.118 43.3832 476.114C41.6948 475.5 39.9021 475.225 38.1073 475.304C36.3126 475.384 34.551 475.816 32.9234 476.576C31.2957 477.336 29.8338 478.41 28.6213 479.736C27.4088 481.061 26.4693 482.613 25.8567 484.301C25.2441 485.99 24.9703 487.783 25.0509 489.578C25.1315 491.373 25.565 493.134 26.3266 494.761C27.0882 496.388 28.163 497.849 29.4895 499.061C30.816 500.272 32.3683 501.21 34.0576 501.822V501.822Z"
    //             fill="#57B894"
    //           />
    //           <path
    //             d="M34.7081 499.374C37.8645 500.519 41.3319 500.463 44.4493 499.216C47.5667 497.968 50.1162 495.618 51.6118 492.611C53.1074 489.605 53.4445 486.154 52.5589 482.915C51.6733 479.676 49.6269 476.877 46.8098 475.05L45.2059 480.45L44.0685 473.68C44.0573 473.675 44.0457 473.67 44.0337 473.667C42.3458 473.055 40.5537 472.781 38.7599 472.861C36.9661 472.941 35.2057 473.374 33.5791 474.135C30.2941 475.671 27.7539 478.449 26.5172 481.858C25.2806 485.267 25.4488 489.028 26.9849 492.313C28.521 495.597 31.2991 498.138 34.7081 499.374V499.374Z"
    //             className="text-gray-800 dark:text-gray-600"
    //             stroke="currentColor"
    //             strokeMiterlimit="10"
    //           />
    //           <path
    //             d="M19.822 524.53C20.3647 527.618 21.9528 530.426 24.3198 532.482C26.6868 534.538 29.6889 535.718 32.8226 535.823C35.9562 535.929 39.0309 534.954 41.5309 533.061C44.0309 531.169 45.8042 528.475 46.5535 525.43C47.3027 522.385 46.9823 519.176 45.6459 516.339C44.3096 513.503 42.0386 511.212 39.2139 509.852C36.3891 508.491 33.1823 508.143 30.1314 508.866C27.0804 509.589 24.3708 511.339 22.457 513.822L28.5493 522.992L20.2249 518.125C19.5795 520.197 19.4413 522.393 19.822 524.53V524.53Z"
    //             fill="#57B894"
    //           />
    //           <path
    //             d="M20.3851 522.718C20.9278 525.806 22.5159 528.614 24.8829 530.67C27.25 532.726 30.252 533.906 33.3857 534.011C36.5194 534.117 39.594 533.142 42.094 531.249C44.594 529.357 46.3673 526.663 47.1166 523.618C47.8658 520.573 47.5454 517.364 46.2091 514.527C44.8727 511.691 42.6017 509.4 39.777 508.039C36.9522 506.679 33.7454 506.331 30.6945 507.054C27.6435 507.777 24.9339 509.527 23.0201 512.01L29.1124 521.18L20.788 516.313C20.1426 518.385 20.0044 520.581 20.3851 522.718V522.718Z"
    //             className="text-gray-800 dark:text-gray-600"
    //             stroke="currentColor"
    //             strokeMiterlimit="10"
    //           />
    //         </g>
    //         <defs>
    //           <clipPath id="clip0">
    //             <rect width="1074.39" height="584.231" fill="white" />
    //           </clipPath>
    //         </defs>
    //       </Box>
    //     </motion.div>

    //     <motion.div
    //       initial={{ opacity: 0, y: 40 }}
    //       animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
    //     >
    //       <Typography
    //         variant="h1"
    //         className="mt-48 sm:mt-96 text-4xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none text-center"
    //       >
    //         Ooops... 404!
    //       </Typography>
    //     </motion.div>

    //     <motion.div
    //       initial={{ opacity: 0, y: 40 }}
    //       animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
    //     >
    //       <Typography
    //         variant="h5"
    //         color="text.secondary"
    //         className="mt-8 text-lg md:text-xl font-medium tracking-tight text-center"
    //       >
    //         The page you requested could not be found.
    //       </Typography>
    //     </motion.div>

    //     <Link className="block font-normal mt-48" to="/">
    //       Back to Dashboard
    //     </Link>
    //   </div>
    // </div>

    <ImageGallery items={images} />
  );
}

export default Error404Page;
