import React from "react";
import data from "./data";
import { useState } from "react";

const List = () => {
  const [people, setPeople] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <pre style={{ fontWeight: "bold" }}>
            {person.name} {howOld(person.birthday) + 1}th birthday{" "}
            <span role="img" aria-label="emoji">
              🥳
            </span>
          </pre>
          <button id="sendBtn">
            Send a Wish{" "}
            <span role="img" aria-label="emoji">
              🥳
            </span>
          </button>
        </div>
      );
    } else {
      return <p>{daysRemaining} days remaining</p>;
    }
  }

  const addPerson = () => {
    let newId = 33;
    const newArray = {
      id: newId,
      name: "klement Lika",
      age: 29,
      birthday: "1998-11-3",
      image:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
    };
    setPeople((people) => [...people, newArray]); //HOW TO ADD NEW OBJECT WITH SETSTATE
  };

  const createModal = () => {
    return (
      <div className={`modal ${isModalOpen && "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Text input"
              ></input>
            </div>
          </div>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
      </div>
    );
  };

  return (
    <>
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
        onClick={() => addPerson()}
      >
        Say Happy birthday to everyone
      </button>
      <button onClick={setIsModalOpen}>open modal</button>
      <div>{createModal()}</div>
    </>
  );
};

export default List;
