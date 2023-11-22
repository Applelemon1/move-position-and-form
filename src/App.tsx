import "./App.scss";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, message, Space } from "antd";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';



function App() {
  const { t, i18n } = useTranslation(['home']);
  const [lang,setLang] = useState('EN')
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: t("EN"),
      key: "en",
    },
    {
      label: t("TH"),
      key: "th",
    },
  ];
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    // message.info("Click on menu item.");
    console.log("click", e);
    const language = e.key;
    i18n.changeLanguage(language)
    if(language == "en"){
      setLang("EN")
    }else setLang("TH")
  };
  
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="container">
      <div className="langButton">
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              {t(`${lang}`)}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <div className="testBox">
        <div className="box" onClick={()=>navigate('/layoutstyle' ,  { state: lang })}>
          <div className="text-box">
            <b>{t("Test 1")}</b>
          </div>
          <div className="text-box" style={{paddingBottom:25}}>
            {t("Layouts & style")}
          </div>
        </div>
        <div className="box">
          <div className="text-box">
            <b>{t("Test 2")}</b>
          </div>
          <div className="text-box" style={{paddingBottom:25}}>
            {t("Connect API")}
          </div>
        </div><div className="box" onClick={()=>navigate('/formtable' ,  { state: lang })}>
          <div className="text-box">
            <b>{t("Test 3")}</b>
          </div>
          <div className="text-box" style={{paddingBottom:25}}>
            {t("Form & Table")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
