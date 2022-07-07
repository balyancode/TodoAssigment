import { DatePicker, Input, Select } from "antd";
import AppTable from "./Table";
import "./DashBoard.css";
const { Option } = Select;
const { TextArea } = Input;
const DashBoard = () => {
  return (
    <>
      <div className="formContainer">
        <Input className="titleInput" placeholder="Title" />
        <TextArea placeholder="Desc..." rows={3} maxLength={1000} />
        <DatePicker className=" titleInput dateInput" size={"large"} />
        <Select defaultValue="lucy" style={{ width: 120 }}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </div>
      {/* <AppTable /> */}
    </>
  );
};

export default DashBoard;
