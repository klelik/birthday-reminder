import React from "react";
import data from "./data";
import { useState } from "react";

const List = () => {
  const [people, setPeople] = useState(data);
  // console.log(people);

  const deletePerson = (id) => {
    let newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
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

    let personFullBirthday = new Date(person.birthday); //personAge from string to full date
    personFullBirthday.setFullYear(today.getFullYear()); //set the persons year of birth === todays year so the getTime compares only months and days not years
    let month = personFullBirthday.getMonth();
    let day = personFullBirthday.getDate();

    let diffTime = personFullBirthday.getTime() - today.getTime(); // difference in ms
    if (diffTime < 0) {
    }
    let daysRemaining = Math.round(diffTime / oneDay); //days remaining for birthday

    if (currentDay === day && currentMonth === month) {
      return (
        <div style={{ display: "", alignItems: "center" }}>
          <pre style={{ fontWeight: "bold" }}>
            Its {person.name} {howOld(person.birthday) + 1}th birthday{" "}
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
      return <div>{daysRemaining} days remaining</div>;
    }
  }

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
        onClick={() => clearAll([])}
      >
        Say Happy birthday to everyone
      </button>
    </>
  );
};

export default List;
