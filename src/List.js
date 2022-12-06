import React from "react";
import data from "./data";
import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

const List = () => {
  const [people, setPeople] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(" ");
  const [birthday, setBirthday] = useState("2022-12-06");
  const [phone, setPhone] = useState(+447542557637);
  const [image, setImage] = useState(
    "https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM="
  );

  let idTrack = people.length;
  // console.log(people);

  const deletePerson = (id) => {
    let newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
    console.log(newPeople);
  };

  const clearAll = () => {
    setPeople([]);
  };

  //Function that counts how old is the person
  function howOld(peronAge) {
    let today = new Date(); //todays date
    let currentYear = today.getFullYear(); //todays year
    let currentMonth = today.getMonth(); //todays year
    let currentDay = today.getDate();

    let personFullBirthday = new Date(peronAge); //personAge from string to full date
    let year = personFullBirthday.getFullYear();
    let month = personFullBirthday.getMonth();
    let day = personFullBirthday.getDate();
    let monthDifference = currentMonth - month;
    let age = currentYear - year; // initial age = 2022 - 1998 //we dont checnk the month
    // let msDifference = personFullBirthday.getTime() - today.getTime();
    // let daysLeft = Math.floor(msDifference/(1000*60*60*24));
    if (monthDifference < 0 || (monthDifference === 0 && currentDay < day)) {
      //if the month hasnt come yet, one year down && the the day of the birthday is later than current day
      age--;
    }
    return age;
  }

  //todays birthdays function
  function todayBirthday(person) {
    function createUrl(person) {
      let num = phone;
      var url1 = "sms:";
      url1 += num;
      url1 += "?&body=Happy birthday ";
      url1 += name;
      url1 +=
        "! I can’t wait to see your beautiful smile light up the room for years to come.";
      return url1; //sends text to the last person created from setName
    }

    const oneDay = 1000 * 60 * 60 * 24; //one day in ms

    let today = new Date(); //todays date
    let currentMonth = today.getMonth(); //todays year
    let currentDay = today.getDate();
    let currentYear = today.getFullYear();

    let personFullBirthday = new Date(person.birthday); //personAge from string to full date
    let month = personFullBirthday.getMonth();
    let day = personFullBirthday.getDate();

    //if the birthday has already passed +1 year of the current year so it starts counting again and not - values
    if (month > currentMonth) {
      personFullBirthday.setFullYear(currentYear);
    } else if (month < currentMonth) {
      personFullBirthday.setFullYear(currentYear + 1);
    } else if (month === currentMonth) {
      if (day > currentDay) {
        personFullBirthday.setFullYear(currentYear);
      } else {
        personFullBirthday.setFullYear(currentYear + 1);
      }
    }
    let diffTime = personFullBirthday.getTime() - today.getTime(); // difference in ms
    let daysRemaining = Math.round(diffTime / oneDay); //days remaining for birthday

    if (currentDay === day && currentMonth === month) {
      return (
        <div style={{ display: "", alignItems: "center" }}>
          <h4 style={{ fontWeight: "bold" }}>
            {person.name} {howOld(person.birthday) + 1}th birthday{" "}
            <span role="img" aria-label="emoji">
              🥳
            </span>
          </h4>
          <a href={createUrl()}>
            <button id="sendBtn">
              Send a Wish{" "}
              <span role="img" aria-label="emoji">
                🥳
              </span>
            </button>
          </a>
        </div>
      );
    } else {
      return <p>{daysRemaining} days remaining</p>;
    }
  }

  // const addPerson = () => {
  //   let newId = 33;
  //   const newArray = {
  //     id: newId,
  //     name: "klement Lika",
  //     age: 29,
  //     birthday: "1998-12-23",
  //     image:
  //       "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
  //   };
  //   setPeople((people) => [...people, newArray]); //HOW TO ADD NEW OBJECT WITH SETSTATE
  // };

  const submiPerson = () => {
    const newPerson = {
      id: idTrack + 1,
      name,
      birthday,
      phone,
      image,
    };
    setPeople((people) => [...people, newPerson]); //HOW TO ADD NEW OBJECT WITH SETSTATE
    console.log(people);
  };
  const createModal = () => {
    return (
      <div className={`modal ${isModalOpen && "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-content flex-auto is-align-content-center is-justify-content-center">
          <h2 className="has-text-white">Add a new person</h2>
          <div className="field">
            <label className="label has-text-white ">Name</label>
            <div className="control">
              <input
                id="namePicker"
                className="input"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">Birthday</label>
            <div className="control">
              <input
                id="datePicker"
                className="input"
                type="date"
                min="1920-01-01"
                max="2022-12-05"
                required
                placeholder="name"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">Phone</label>
            <div className="control">
              <input
                id="phonePicker"
                className="input"
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label has-text-white">Image URL</label>
            <div className="control">
              <input
                id="imgPicker"
                className="input"
                type="text"
                placeholder="name"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="control">
            <button
              onClick={() => subAndClose()}
              id="submit"
              className="button is-primary"
            >
              Submit
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(false)}
          class="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    );

    function dateRequired() {
      document.getElementById("datePicker").required = true;
    }

    function subAndClose() {
      submiPerson();
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <BsFillPlusCircleFill
        onClick={setIsModalOpen}
        id="modalBtn"
        className=" button  is-small is-outlined"
      />
      {people.map((person) => {
        const { id, name, age, image, birthday } = person;
        return (
          <article key={id} className="person">
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <p>{howOld(birthday)} years old</p>
              {todayBirthday(person)}
            </div>
            <div className="delete" onClick={() => deletePerson(id)}>
              x
            </div>
          </article>
        );
      })}
      <button onClick={() => clearAll([])}>clear all</button>

      <button
        style={{ backgroundColor: "#AFEEEE" }}
        onClick={() => setIsModalOpen(true)}
      >
        open modal
      </button>
      <div>{createModal()}</div>
    </>
  );
};

export default List;
