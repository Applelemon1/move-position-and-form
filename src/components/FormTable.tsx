import React from "react";
import "./LayoutStyle.scss";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Button,
  Dropdown,
  Space,
  Checkbox,
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Table,
} from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import "./FormTable.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUSer, updateUser } from "../Reducer/UserReducer";

function FormTable() {
  const users = useSelector((state: any) => state.users);
  // console.log("users", users.lenght);
//   const [userss,setUserss] =useState(()=>{
//     return JSON.parse(localStorage.getItem('dataKey')!) || []
// })
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["home"]);
  const [lang, setLang] = useState("EN");
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [nowEdit, setNowEdit] = useState("");


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
  const onFinish = (user: any) => {
    console.log("Success:", user);
    if (nowEdit !== "") {
      dispatch(updateUser({
        id : nowEdit,
        name: user.firstname,
        sex: user.gender,
        phone: user.phone,
        national: user.national,
      }))
      setNowEdit("");
    } else {
      dispatch(
        addUser({
          id: String(Math.random()),
          name: user.firstname,
          sex: user.gender,
          phone: user.phone,
          national: user.national,
        })
      );
    }

    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
  };

  const handleEdit = (user : any) => {
    setNowEdit(user.id);
    form.setFieldsValue({
      firstname: user.name,
      gender: user.sex,
      phone: user.phone,
      national: user.national,
    });
  };

  const { Option } = Select;
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{ width: 70, backgroundColor: "white", borderRadius: "8px" }}
      >
        <Option value="66">+66</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  useEffect(() => {
    if (state !== null) {
      setLang(state);
    }
  }, []);

  // useEffect(()=>{
  //   window.localStorage.setItem("dataKey", JSON.stringify(users));
  //   setUserss(users)
  // },[users])

  // useEffect(() => {
  //   // setUsers('')
  // }, [userss]);

  const scroll: { x?: number | string; y?: number | string } = {};
  scroll.y = 100;
  scroll.x = "0";

  const onReset = () => {
    form.resetFields();
  };

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      sorter: true,
    },
    {
      title: t("sex"),
      dataIndex: "sex",
      sorter: true,
    },
    {
      title: t("phone"),
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: t("national"),
      dataIndex: "national",
      sorter: true,
    },
    {
      title: t("action"),
      key: "action",
      render: (user: any) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            onClick={(e) => dispatch(deleteUSer({ id: user.id }))}
          >
            {t("delete")}
          </Button>
          <Button type="primary" onClick={() => handleEdit(user)}>
            <Space>{t("edit")}</Space>
          </Button>
        </Space>
      ),
    },
  ];

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
      <div className="HomeButton">
        <Button onClick={() => navigate("/")}>
          <Space>{t(`home`)}</Space>
        </Button>
      </div>

      <div className="title">
        <h2>{t("Form & Table")}</h2>
      </div>
      <div className="formInput">
        <div className="form">
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="inline"
          >
            <Form.Item
              style={{ width: "20%" }}
              name="title"
              label={t("title")}
              rules={[{ required: true }]}
            >
              <Select
                placeholder={t("title")}
                // onChange={onGenderChange}
                allowClear
              >
                <Option value="male">{t("male")}</Option>
                <Option value="female">{t("female")}</Option>
                <Option value="other">{t("other")}</Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ width: "35%" }}
              label={t("firstname")}
              name="firstname"
              rules={[{ required: true, message: "โปรดกรอกชื่อจริง" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ width: "35%" }}
              label={t("lastname")}
              name="lastname"
              rules={[{ required: true, message: "โปรดกรอกนามสกุล" }]}
            >
              <Input />
            </Form.Item>
            {/* <br></br> */}
            <Form.Item
              style={{ marginTop: "1rem" }}
              // wrapperCol={{ offset:24 ,span: 16 }}
              name="birth"
              label={t("birth")}
              rules={[{ required: true, message: "โปรดกรอกวันเกิด" }]}
            >
              <DatePicker placeholder={t("mmddy")} />
            </Form.Item>

            <Form.Item
              style={{ marginTop: "1rem", width: "40%" }}
              name="national"
              label={t("national")}
              rules={[{ required: true, message: "โปรดกรอกสัญชาติ" }]}
            >
              <Select placeholder={t("please choose")}>
                <Select.Option value="ไทย">ไทย</Select.Option>
                <Select.Option value="อังกฤษ">อังกฤษ</Select.Option>
                <Select.Option value="จีน">จีน</Select.Option>
                <Select.Option value="ญี่ปุ่น">ญี่ปุ่น</Select.Option>
                <Select.Option value="เกาหลี">เกาหลี</Select.Option>
                <Select.Option value="อื่นๆ">อื่นๆ</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginTop: "1rem", width: "70%" }}
              label={t("ID number")}
              name="Idnumber"
              // rules={[{ required: true, message: "โปรดกรอกนามชื่อ" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ marginTop: "1rem", width: "30%" }}
              name="gender"
              label={t("sex")}
              rules={[{ required: true, message: "โปรดกรอกเพศ" }]}
            >
              <Radio.Group>
                <Radio value="ผู้ชาย">{t("male")}</Radio>
                <Radio value="ผู้หญิง">{t("female")}</Radio>
                <Radio value="ไม่ระบุ">{t("other")}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              style={{ marginTop: "1rem", width: "70%" }}
              name="phone"
              label={t("phone")}
              rules={[{ required: true, message: "โปรดกรอกเบอร์โทรศัพท์" }]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              style={{ marginTop: "1rem", width: "60%" }}
              label={t("passport")}
              name="passport"
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ marginTop: "1rem", width: "40%" }}
              label={t("expected salary")}
              name="salary"
              rules={[
                { required: true, message: "โปรดกรอกเงืนเดือนที่คาดหวัง" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ marginTop: "1rem", width: "50%" }}>
              <Button
                style={{ marginLeft: 20 }}
                htmlType="button"
                onClick={onReset}
              >
                {t("reset")}
              </Button>
              <Space size={"large"} /> <Space size={"large"} />{" "}
              <Space size={"large"} />
              <Button style={{ marginLeft: 40 }} htmlType="submit">
                {nowEdit ? t('update') : t("submit")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="table-container">
        <div className="table-data">
          <div className="choose-and-delete">
            <Checkbox
              // onChange={onChange}
              style={{ display: "flex", alignItems: "center" }}
            >
              {t("choose all")}
            </Checkbox>
            <Button>{t("delete data")}</Button>
          </div>

          <div className="table-row">
            <Table
              style={{ marginTop: "0.5rem" }}
              // {...tableProps}
              pagination={{}}
              columns={columns}
              // dataSource={userss.lenght == 0 ? users : userss}
              dataSource={users}
              scroll={scroll}
              size="middle"
              rowSelection={{}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormTable;
