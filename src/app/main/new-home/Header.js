import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import history from '@history';

import ScrollTo from 'react-scroll-into-view';

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: '#FFF',
        height: '7rem',
        width: '100%',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 100,
        top: 0,
        padding: '0 15rem 0 15rem',
        position: 'fixed',
      }}
    >
      <nav className="py-12 flex justify-between">
        <div className="flex flex-row justify-center items-center text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
            <div className="flex justify-center items-center">
              <svg
                width="98"
                height="41"
                viewBox="0 0 98 41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M64.8806 30.5501H58.0803L51.0587 15.9174H50.9481C51.1085 18.2146 51.1914 19.9704 51.1914 21.1818V30.5501H46.6025V9.77954H53.3697L60.3581 24.2088H60.4355C60.3166 22.121 60.2586 20.44 60.2586 19.1718V9.77954H64.8806V30.5501Z"
                  fill="#60DAFA"
                />
                <path
                  d="M81.3075 16.3845C81.3075 18.7056 80.6204 20.5003 79.2521 21.7686C77.8809 23.0308 75.9421 23.659 73.4327 23.659H71.8553V30.5506H66.251V9.78003H73.4327C76.0437 9.78003 78.0094 10.3543 79.3238 11.5029C80.6443 12.6456 81.3075 14.2727 81.3075 16.3845ZM71.8553 19.0885H72.871C73.7135 19.0885 74.3827 18.8552 74.8786 18.3826C75.3805 17.904 75.6314 17.2459 75.6314 16.4084C75.6314 15.0145 74.8547 14.3146 73.3012 14.3146H71.8553V19.0885Z"
                  fill="#60DAFA"
                />
                <path
                  d="M97.3921 24.2455C97.3921 25.5317 97.0495 26.6743 96.3703 27.6794C95.6881 28.6784 94.7037 29.4561 93.4171 30.0124C92.1368 30.5628 90.6321 30.838 88.9063 30.838C87.4671 30.838 86.2584 30.7423 85.2802 30.5509C84.3082 30.3534 83.2927 30.0095 82.2397 29.5219V24.5207C83.3519 25.0711 84.5107 25.5018 85.7163 25.8129C86.9188 26.124 88.0247 26.2795 89.0309 26.2795C89.8938 26.2795 90.5293 26.1359 90.9374 25.8488C91.3424 25.5556 91.548 25.1788 91.548 24.7241C91.548 24.4369 91.4639 24.1917 91.2988 23.9823C91.1399 23.7669 90.8782 23.5516 90.5137 23.3362C90.1555 23.1149 89.196 22.6662 87.6353 21.9962C86.2303 21.383 85.1743 20.7877 84.4702 20.2134C83.7631 19.6332 83.2397 18.9661 82.9002 18.2154C82.5575 17.4676 82.3893 16.5822 82.3893 15.5592C82.3893 13.6449 83.112 12.1553 84.5575 11.0845C86.0091 10.0166 88.0029 9.4812 90.5387 9.4812C92.7816 9.4812 95.0651 9.98072 97.3921 10.9768L95.5978 15.308C93.5791 14.4166 91.8346 13.9679 90.3642 13.9679C89.5979 13.9679 89.0434 14.0965 88.6945 14.3508C88.3518 14.608 88.1836 14.9251 88.1836 15.308C88.1836 15.7148 88.4016 16.0827 88.844 16.4087C89.2832 16.7288 90.4764 17.312 92.4203 18.1555C94.28 18.9631 95.5728 19.8276 96.2956 20.7519C97.0245 21.6791 97.3921 22.8427 97.3921 24.2455Z"
                  fill="#60DAFA"
                />
                <path
                  d="M16.5447 0.476585C16.6454 0.572192 16.7436 0.670655 16.8467 0.761977C18.5165 2.2274 19.8446 4.03424 20.7292 6.26538C20.8772 6.63938 21.0651 6.73208 21.3876 6.72905C23.3126 6.71373 25.2376 6.7084 27.1627 6.72449C29.1265 6.74199 30.561 7.8663 31.3219 9.93902C32.7429 13.8089 30.2774 17.3397 27.5887 17.4469C25.3655 17.5366 23.1373 17.4764 20.9117 17.4962C19.3031 17.5099 17.6896 17.4651 16.087 17.5916C13.7911 17.7713 11.8363 18.9489 10.2247 20.8615C7.82439 23.707 6.84138 27.1641 7.38477 31.1173C7.89169 34.7979 9.62746 37.5568 12.3339 39.4686C12.4188 39.5299 12.517 39.5656 12.6479 39.6326C12.6588 39.427 12.6733 39.2757 12.6732 39.1215C12.6745 36.1931 12.6625 33.2661 12.6759 30.3378C12.6804 29.4397 12.64 28.5102 12.8167 27.652C13.2498 25.533 14.9803 23.9158 16.8338 23.8734C19.3443 23.8149 21.8561 23.8664 24.3678 23.8308C26.0031 23.8085 27.6567 24.0217 29.2688 23.5654C33.0299 22.4997 35.5867 19.7769 36.6784 15.4245C38.1527 9.55838 35.6799 3.64159 30.9258 1.22837C29.9218 0.719196 28.8586 0.491328 27.7748 0.389115C27.4318 0.356462 27.0839 0.366646 26.7384 0.366833C23.3538 0.36724 19.9705 0.370501 16.5871 0.372335C16.5726 0.406609 16.5593 0.440883 16.5447 0.476585Z"
                  fill="#60DAFA"
                />
                <path
                  d="M14.5075 15.495C15.5803 15.436 16.5658 15.3685 17.5513 15.331C18.2277 15.305 18.9042 15.3219 19.5818 15.323C19.7806 15.3244 19.9382 15.2957 19.932 14.9888C19.8898 13.097 20.0973 11.1837 19.6709 9.32204C18.6807 4.98915 16.3615 2.0803 12.7229 0.821083C7.65006 -0.932984 2.40999 2.28311 0.583679 8.12918C0.184287 9.4072 0.0103965 10.7365 0.00986834 12.0915C0.00854477 21.4763 0.0157067 30.861 0.0216564 40.2458C0.0220305 40.9868 0.024455 40.9868 0.626935 40.9866C2.05495 40.9874 3.48416 40.9668 4.91219 40.9977C5.34981 41.006 5.46368 40.8504 5.46342 40.3406C5.44534 30.9373 5.44302 21.534 5.44191 12.1321C5.44075 9.82765 6.57442 7.89683 8.38872 7.08082C11.2974 5.77177 14.4711 8.30619 14.5057 11.9727C14.516 13.1406 14.5069 14.3085 14.5075 15.495Z"
                  fill="#60DAFA"
                />
              </svg>
            </div>
          </motion.div>
          {/* <h1 className="ml-12 px-2 text-xl text-center my-auto uppercase font-bold text-white">
            MiSmart
          </h1> */}
        </div>
        <div className="flex flex-row justify-center space-x-8 font-bold text-base">
          <div className="flex flex-row justify-center items-center my-auto space-x-10 text-white">
            <div className="px-20 text-black">
              <ScrollTo selector="#home">
                <Typography
                  sx={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    color: '#000000',
                    '&:hover': {
                      color: '#006AFF',
                      cursor: 'pointer',
                    },
                  }}
                >
                  Home
                </Typography>
              </ScrollTo>
            </div>

            <div className="px-20 text-black">
              <ScrollTo selector="#industry">
                {' '}
                <Typography
                  sx={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    color: '#000000',
                    '&:hover': {
                      color: '#006AFF',
                      cursor: 'pointer',
                    },
                  }}
                >
                  Feature
                </Typography>
              </ScrollTo>
            </div>

            <div className="px-20 text-black">
              <ScrollTo selector="#product">
                {' '}
                <Typography
                  sx={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    color: '#000000',
                    '&:hover': {
                      color: '#006AFF',
                      cursor: 'pointer',
                    },
                  }}
                >
                  Product
                </Typography>
              </ScrollTo>
            </div>

            <div className="px-20 text-black">
              <ScrollTo selector="#contact">
                {' '}
                <Typography
                  sx={{
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    color: '#000000',
                    '&:hover': {
                      color: '#006AFF',
                      cursor: 'pointer',
                    },
                  }}
                >
                  Contact
                </Typography>
              </ScrollTo>
            </div>
          </div>
          <div
            style={{ color: '#32E5F1' }}
            className="flex flex-row justify-center items-center my-auto px-20"
          >
            <button
              onClick={() => history.push('/login')}
              type="button"
              style={{
                color: '#1E5AF5',
                fontSize: '1.8rem',
                fontWeight: '600',
              }}
            >
              Sign in
            </button>
          </div>

          <div className="px-16 m-auto ">
            {' '}
            <Button
              sx={{
                borderRadius: '6px',
                background: 'linear-gradient(33.28deg, #1D5CFE 16.9%, #35B6FF 93.47%)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                width: '13.4rem',
                height: '4rem',
              }}
            >
              <Typography
                variant="h6"
                className="text-white"
                sx={{
                  fontSize: '1.6rem',
                  fontWeight: '600',

                  fontFamily: 'Roboto, "Helvetica", "Arial", sans-serif',
                }}
              >
                Try for free
              </Typography>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
