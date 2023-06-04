const ConstructionIcon = (props) => (
  <svg
    width="54"
    height="50"
    viewBox="0 0 54 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M53.2886 50H0.714844V46.9183H9.37785V12.7385H7.69494V11.0185H1.33255V1.73644H7.6469V0H20.3964V1.71585H21.0237C26.6572 1.71585 32.2911 1.71311 37.9256 1.70762C38.0843 1.69982 38.2428 1.72701 38.3899 1.78726C38.5369 1.84751 38.669 1.93935 38.7766 2.05628C41.5696 4.88584 44.3708 7.70808 47.1802 10.523C47.2982 10.6424 47.4122 10.7673 47.6016 10.9664H39.964V15.9835H36.8754V11.0419H20.4321V12.7165H18.697V46.8703H27.581V28.4146C27.7608 28.4022 27.9063 28.383 28.0532 28.383C29.6798 28.383 31.3065 28.3665 32.9331 28.3953C33.2104 28.413 33.473 28.5265 33.6757 28.7165C35.1239 30.1304 36.5419 31.5717 37.9846 32.9911C38.1886 33.1801 38.4523 33.2918 38.7299 33.3068C40.406 33.3342 42.0834 33.3219 43.8171 33.3219V20.4846H51.7375V46.9115H53.2886V50ZM15.5618 39.8353H12.5295V46.873H15.5618V39.8353ZM12.5199 26.593H15.5398V19.6555H12.5199V26.593ZM15.5659 29.7502H12.5378V36.6918H15.5645L15.5659 29.7502ZM34.012 39.105V43.8847H37.0319V39.1091L34.012 39.105ZM43.4657 39.105V43.8792H46.4856V39.1091L43.4657 39.105ZM15.5632 12.766H12.5433V16.5134H15.5632V12.766ZM20.4321 7.87097H25.5028C24.4733 6.84008 23.5137 5.87509 22.5487 4.91833C22.473 4.85079 22.3757 4.81236 22.2742 4.80988C21.6661 4.80027 21.058 4.80988 20.4293 4.80988L20.4321 7.87097ZM4.40462 7.87097H7.63042V4.83185H4.40462V7.87097ZM34.2481 7.87097H40.0848L37.1596 4.97049L34.2481 7.87097ZM27.0031 4.83734L29.7869 7.62938C30.6846 6.72066 31.6469 5.7488 32.546 4.83734H27.0031Z"
      fill={props.isActive ? '#DCAC65' : '#868E96'}
    />
  </svg>
);
export default ConstructionIcon;
