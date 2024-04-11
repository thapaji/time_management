const taskList = [];
const entryTable = document.getElementById("entryList");
const optimizeTable = document.getElementById("optimizeList");
const alertElm = document.getElementsByClassName("alert-hour")[0];
const savedElm = document.getElementById("savedElm");
const twklHr = 175;

const handleSubmit = (form) => {
  const newForm = new FormData(form);
  const task = newForm.get("task");
  const hour =
    newForm.get("duration") === "week"
      ? +newForm.get("hour")
      : +newForm.get("hour") * 7;

  const obj = {
    task,
    hour,
    type: "entry",
  };

  const prevTotal = displayTotal();
  if (prevTotal + hour > twklHr) {
    return alert("Sorry you do not have enough time left!!!!");
  }
  taskList.push(obj);
  display();
  displayTotal();
  form.reset();
};

const display = () => {
  let strEntry = "";
  let strOptimize = "";
  let cntEntry = 1,
    cntOptimize = 1;
  taskList.forEach((item, i) => {
    if (item.type === "entry") {
      strEntry += `
    <tr>
    <td>${cntEntry++}</td>
    <td>${item.task}</td>
    <td>${item.hour}hrs</td>
    <td class="text-end">
      <button class="btn btn-danger btn-sm" onClick="handOnDelete(${i})"><i class="fa-solid fa-trash"></i></button>
      <button class="btn btn-success btn-sm" onClick="updateType(${i})">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
    </tr>`;
      // total += parseFloat(item.hour);
    } else {
      strOptimize += `
            <tr onclick="showDialog(this)">
            <td>${cntOptimize++}</td>
            <td>${item.task}</td>
            <td>${item.hour}hrs</td>
            <td class="text-end">
            <button class="btn btn-success btn-sm" onClick="updateType(${i})">
                <i class="fa-solid fa-arrow-left"></i>
              </button>
              <button class="btn btn-danger btn-sm" onClick="handOnDelete(${i})"><i class="fa-solid fa-trash"></i></button>
            </td>
            </tr>`;
    }
  });

  // alertElm.innerText = `Total hours allocated = ${total()}hrs`;
  entryTable.innerHTML = strEntry;
  optimizeTable.innerHTML = strOptimize;
};

const displayTotal = () => {
  const total = taskList.reduce((subTotal, item) => {
    return subTotal + item.hour;
  }, 0);
  alertElm.innerText = `Total hours allocated = ${total}hrs`;
  return total;
};

const handOnDelete = (id) => {
  if (window.confirm("Are you sure, you want to delete the item?")) {
    taskList.splice(id, 1);
    display();
    displaySavedHours();
    displayTotal();
  }
};

const updateType = (id) => {
  taskList[id].type === "entry"
    ? (taskList[id].type = "optimize")
    : (taskList[id].type = "entry");
  displaySavedHours();
  display();
};

const displaySavedHours = () => {
  const total = taskList.reduce((subTotal, item) => {
    if (item.type === "optimize") {
      return subTotal + item.hour;
    } else {
      return (subTotal += 0);
    }
  }, 0);
  savedElm.innerText = `You could have saved ${total}hrs`;
};

const showDialog = ()=>{
    console.log('ayoooooooooooooooooooooooooooo');
    const elmModal = document.querySelector('#exampleModal');
    console.log(elmModal);
    elmModal.modal('toggle');
}