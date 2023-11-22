import "./LayoutStyle.scss";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function LayoutStyle() {
  const { t, i18n } = useTranslation(["home"]);
  const [lang, setLang] = useState("EN");
  //   const navigate = useNavigate();
  const { state } = useLocation();
  const [arr, setArr] = useState([
    "square",
    "circle",
    "oval",
    "trapezoid",
    "rectangle",
    "parallelogram",
  ]);
  const [moveposition, setMovePostion] = useState(false);

  const moveLeft = () => {
    const newArr = [...arr];
    const poppedElement = newArr[0];
    newArr.shift();
    newArr.push(poppedElement);
    setArr(newArr);
  };
  const moveRight = () => {
    const newArr = [...arr];
    const poppedElement = newArr[5];
    newArr.pop();
    newArr.unshift(poppedElement);
    setArr(newArr);
  };

  const randomArr = () => {
    const Newarr = [...arr];

    let currentIndex = Newarr.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = Newarr[currentIndex];
      Newarr[currentIndex] = Newarr[randomIndex];
      Newarr[randomIndex] = temporaryValue;
    }

    setArr(Newarr);
  };

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
    i18n.changeLanguage(language);
    if (language == "en") {
      setLang("EN");
    } else setLang("TH");
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    // console.log('1',state)
    if (state !== null) {
      setLang(state);
    }
  }, []);

  return (
    <div className="container2">
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
      <div className="title">
        <h2>{t("Layout & Style")}</h2>
      </div>

      <div className="moveButton">
        <div className="moveLeft" onClick={() => moveLeft()}>
          <div className="arrowLeft" />
          <div className="moveShape">
            <div className="moveShape-text">{t("Move shape")}</div>
          </div>
        </div>

        <div
          className="moveUpDown"
          onClick={() => setMovePostion(!moveposition)}
        >
          <div className="arrowUpDown">
            <div className="arrowUp"></div>
            <div className="arrowDown"></div>
          </div>

          <div className="moveShape" style={{ marginTop: 20 }}>
            <div className="moveShape-text">{t("Move position")}</div>
          </div>
        </div>

        <div className="moveRight" onClick={() => moveRight()}>
          <div className="arrowRight" />

          <div className="moveShape">
            <div className="moveShape-text">{t("Move shape")}</div>
          </div>
        </div>
      </div>

      <div className="line" />
      <div className="shapes">
        <div className="shapesBox">
          <div className={moveposition ? "shapesBoxDown" : "shapesBoxUp"}>
            {arr.slice(0, 3).map((shape) => (
              <div className="shapesMath" onClick={() => randomArr()}>
                <div className={`${shape}`} />
                {/* {shape} */}
              </div>
            ))}
          </div>

          <div className={moveposition ? "shapesBoxUp" : "shapesBoxDown"}>
            {arr.slice(-3).map((shape) => (
              <div className="shapesMath" onClick={() => randomArr()}>
                <div className={`${shape}`} />
                {/* {shape} */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutStyle;
