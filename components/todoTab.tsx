// import React, { ReactElement, ReactNode, useState } from 'react'


// export interface TabProps {
//     label: string;
//     children: ReactNode;
//     className:string;

//   }
//   export interface TabsProps {
//     activeTabIndex: number;
//     children: ReactElement<TabProps> | ReactElement<TabProps>[];
//     className:string;
//   }
//   export const sanitizeForId = (label: string) => {
//     return label
//       .toLowerCase()
//       .replace(/[^\w\s]|(\s+)/g, (_match: string, group1: string) =>
//         group1 ? "-" : ""
//       );
//   }


//  export const TodoTab: React.FC<TabProps>= ({label,children,className}) => {
//     return (
//       <div
//       className={className}
//       role="tabpanel"
//       aria-labelledby={`tab-${sanitizeForId(label)}`}
//       id={`panel-${sanitizeForId(label)}`}
//       >
//           {children}
//       </div>
//     )
//   }
//  export const Todolist = ({children, activeTabIndex = 0,className}:TabsProps)=>{
//   const [activeTab, setActiveTab] = useState(activeTabIndex);
//   const handleTabClick = (index: number) => {
//     setActiveTab(index);
//   };
//   const tabs = React.Children.toArray(children).filter(
//     (child): child is ReactElement<TabProps> =>
//       React.isValidElement(child) && child.type === TodoTab
//   )
//   return(
//     <div className={`${className} flex flex-col-reverse` }>
//       <nav>
//         <ul className='flex'>
//        {tabs.map((tab,index) =>(
//         <li key={`tab-${index}`}>
//          <button
//          key={`tab-btn-${index}`}
//          role='tab'
//          id={`tab-${sanitizeForId(tab.props.label)}`}
//           aria-controls={`panel-${sanitizeForId(tab.props.label)}`}
//           aria-selected={activeTab === index}
//           onClick={() => handleTabClick(index)}
//                 className={`tab-btn ${
//                   activeTab === index && "tab-btn--active"
//                 } ${activeTab === index ? "active ":""}`}
//          >
//                {tab.props.label}
//          </button>
//         </li>
//        ))}
//         </ul>
//       </nav>
//       {tabs[activeTab]}
//     </div>
//   )
//  } 


// export default Todolist