const taskList = [];
const entryTable = document.getElementById('entryList');

const handleSubmit = (form) => {
    const newForm = new FormData(form);
    const task = newForm.get('task');
    const hour = newForm.get('hour');

    const obj = {
        task,
        hour
    }
    taskList.push(obj);
    console.log(taskList);
    display();
}


const display = () => {
    let str = '';


    taskList.forEach((item, i) => {
        str += `
    <tr>
    <td>${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hour}hrs</td>
    <td class="text-end">
      <button class="btn btn-danger btn-sm"><i class="fa-solid fa-trash"></i></button>
      <button class="btn btn-success btn-sm">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </td>
    </tr>`
    });
    entryTable.innerHTML = str;
}


