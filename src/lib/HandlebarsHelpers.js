/*
    This library is used to register custom Handlebars helpers.
*/
import Handlebars from "handlebars";
//import helpers from 'handlebars-helpers';
import handlebarsHelpers from "handlebars-helpers";
const handyHelpers = handlebarsHelpers();

const myHelpers = {
  todoTask: function (options) {
    const label = options.fn(this);
    return new Handlebars.SafeString(`
    
    <div class="container--task">
    <a href=""><i class="fa-solid fa-check check--task"></i></a>
    <p class="fieldColor--task">${label}</p>
    <a href=""><i class="fa-solid fa-trash trash--task"></i></a>
    <a href=""><i class="fa-solid fa-pen-to-square pen--task"></i></a>
    </div>`);
  },
  doneTask: function (options) {
    const label = options.fn(this);
    return new Handlebars.SafeString(`
    <p class="fieldColor fieldColor--task">${label}</p>
      <a><i class="fa-solid fa-trash trash--finish"></i></a>`);
  },
  link: function (basepath, uri, activeUri, options) {
    console.log(uri);
    console.log(activeUri);
    if (options === undefined) {
      options = uri;
      uri = basepath;
      basepath = "";
    }
    let className = "link";
    if (uri === activeUri) {
      className = "selected";
    }
    const label = options.fn(this);
    const url = `${basepath}/${uri}`;
    return new Handlebars.SafeString(
      `<a class="${className}" href='${url}'>${label}</a>`
    );
  },
  compare: function (variableOne, comparator, variableTwo) {
    if (eval(variableOne + comparator + variableTwo)) {
      return true;
    } else {
      return false;
    }
  },
};

export default { ...handyHelpers, ...myHelpers };
