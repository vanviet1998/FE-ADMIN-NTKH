import React from 'react';
import "./styles.scss"



export class Home extends React.Component {


  render() {
    return (
      <div >

      </div>
    );
  }
}





































// import React from "react";
// import { useTranslation } from 'react-i18next';
// import { useObserver } from "mobx-react";
// import { useStores } from "mobx/store";

// export const Home: React.FC = () => {
//   const { userStore } = useStores()
//   console.log("🚀 ~ file: index.tsx ~ line 10 ~ userStore", userStore)
//   const { t } = useTranslation();
//   const _handleClick=()=>{
//     userStore.updateTimer()
//   }
//   return useObserver(() => (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//       }}
//     >
//       <button onClick={_handleClick}>Click Di bro {userStore.timer}</button>
//       {t('Welcome to React')}

//     </div>
//   )
//   );
// };

