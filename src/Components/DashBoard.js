import { Button,  Input, Select } from "antd";
import AppTable from "./Table";
import "./DashBoard.css";
import { useEffect, useState } from "react";
const { Option } = Select;
const { TextArea } = Input;
const DashBoard = () => {
  const [title, setTitle] = useState("");
  const [description, setDesrciption] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  const [datasource, setDataSource] = useState([]);
  
  const dataSourceSet = () => {
    const newTask = {
     key : title.length+1,
      title: title,
      Description: description,
      createdAt: new Date().toLocaleDateString(),
      DueDate: dueDate,
      Tag: tags,
    };
    setDataSource((pre) => {
      return [...pre, newTask];
    });
  };


  const onEditClickHandler = (title,desc,date,tag) => {
    setTitle(title);
    console.log("Description before Console",desc)
    setDesrciption(desc);
    setDueDate(date);
    setTags(tag);
    setDataSource(datasource.filter((titleItem) => titleItem.title != title));
  };

const onDeleteClickHandler=(record)=>{
  setDataSource(datasource.filter((titleItem) => titleItem.title != record.title));
}

  const onAddClickHandler = () => {
  dataSourceSet();
  setTitle("");
  setDesrciption("")
  setDueDate("")
  setTags("")
} 

  return (
    <>
      <div className="Heading">
        <h1 className="todoHeading">ToDo's</h1>
      </div>
      <div className="background" style={{ display: "flex" }}>
        <div className="formContainer">
          <Input
            className="titleInput"
            placeholder="Title *"
            max={100}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            placeholder="Description "
            rows={3}
            maxLength={1000}
            value={description}
            onChange={(e) => setDesrciption(e.target.value)}
          />
          <Input
            type="date"
            className=" titleInput dateInput"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
           
          />
          <select
            style={{ width: 190, marginTop: "1%", marginLeft: "18vh",height:"30px" }}
            onChange={(e) => setTags(e.target.value)}
          >
            <option value="select">Select Tag</option>
            <option value="Market">Market</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
          </select>
        </div>
        
        <Button
          className="button"
          size="large"
          style={{ borderRadius: "10%", backgroundColor: "#3EADCF" }}
          onClick={() => onAddClickHandler()}
          disabled={title? false: true}
        >
          Add
        </Button>

      </div>

      <div style={{ marginTop: "5%" }}>
        <AppTable
          datasource={datasource}
          onEditClickHandler={onEditClickHandler}
          onDeleteClickHandler={onDeleteClickHandler}
        />
      </div>
    </>
  );
};

export default DashBoard;
