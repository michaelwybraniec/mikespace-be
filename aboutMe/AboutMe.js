<Row>
  <Col sm="12" className="text-center p-2 shadow">
    <a href="https://github.com/michaelwybraniec/">
      My repository </a></Col>
  <Col sm="12" className="text-center p-2 shadow" >
    <h6> Hard to read? - https://beautifier.io/ </h6>
  </Col>
</Row>

var msg = "<b>Hello world !</b>";
var icon = '<i class="fa fa-smile-o"></i>';
const aboutMe = {
  "summary":
  {
    header: "Development of web and mobile applications on a fully JavaScript-oriented Stack",
    duties: ["Developing and managing agile project plans", "Managing and assisting senior developers", "Bugging and debugging"]
  }

}; var currentTechnology = {
  front_end: {
    react_js: "Declarative, Component-Based", redux_js: "Centralised state container"
  },

  back_end: {
    node_js: "An asynchronous event driven JS runtime",
    mongo_db: "NoSQL database"
  }
};

const moreDetailsSchema = new mongoose.Schema(
  {
    dev_type: {
      type: { "enum": ["JrDeveloper", "Developer"] },
      required: true
    },
    name: {
      required: true
    },
    communication: {
      type: {
        enum: ["English", "French", "Polish"]
      }
    },
    java_script: {
      type: {
        enum: ["React", "Redux", "Axios", "NodeJs", "Express", "MongoDB"]
      }, required: true
    },
    other_tech: {
      type: {
        enum: ["Agile", "Postman", "Robo3T", "Compass", "Git", "Jira"]
      }, required: true
    },
    email: { "required": true, "unique": true }
  });

console.log(msg); console.log(developer); $('#msg').html(msg + icon);


var currentTechnology = [{
  front_end: { react_js: "Declarative, Component-Based", redux_js: "Centralised state container" }
},
{ back_end: { node_js: "An asynchronous event driven JS runtime", mongo_db: "NoSQL database" } }];