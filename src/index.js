import React from "react";
import ReactDOM from "react-dom";
import Files from "react-files";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context("./images/", false, /\.(png|jpg)$/));

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
      output: {},
      labels: require("./label_names.json")
    };
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.handleLabelSelected = this.handleLabelSelected.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.fileReader = new FileReader();
    this.fileReader.onload = event => {
      this.setState({
        output: JSON.parse(event.target.result),
        currentIndex: Object.keys(JSON.parse(event.target.result)).length
      });
      // console.log(this.state.output, this.state.currentIndex);
    };
  }

  handleSave() {
    const downloadFile = async () => {
      const json = JSON.stringify(this.state.output, null, 4);
      const blob = new Blob([json], { type: "application/json" });
      const href = await URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = "image_label.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    downloadFile();
  }

  goToPrevSlide() {
    const { currentIndex } = this.state;
    const newPointer =
      currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    this.setState({ currentIndex: newPointer });
  }

  goToNextSlide() {
    const { currentIndex } = this.state;
    const newPointer =
      currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    this.setState({ currentIndex: newPointer });
  }

  handleLabelSelected(event) {
    // console.log(Array.from(event.target.options));

    const selectedLabel = Array.from(event.target.options)
      .filter(function(optionsArray) {
        return optionsArray.selected === true;
      })
      .map(options => {
        return options.value;
      });

    const fileFormat =
      "." + images[this.state.currentIndex].split(".").slice(-1);
    const fileName =
      images[this.state.currentIndex]
        .split("/")
        .slice(-1)[0]
        .split(".")[0] + fileFormat;
    // console.log(selectedLabel, fileName);

    this.setState({
      output: { ...this.state.output, [fileName]: selectedLabel }
    });
  }

  render() {
    console.log(this.state.output);

    const fileFormat =
      "." + images[this.state.currentIndex].split(".").slice(-1);
    const fileName =
      images[this.state.currentIndex]
        .split("/")
        .slice(-1)[0]
        .split(".")[0] + fileFormat;

    const label = this.state.labels.map(label => {
      if (this.state.output[fileName] === undefined) {
        return <option selected={false}>{label.label_name}</option>;
      } else if (this.state.output[fileName].includes(label.label_name)) {
        return <option selected>{label.label_name}</option>;
      } else {
        return <option selected={false}>{label.label_name}</option>;
      }
    });

    return (
      <div className="home">
        <img src={images[this.state.currentIndex]} alt="" width="300" />
        <br />
        <button className="prev" onClick={this.goToPrevSlide}>
          Previous
        </button>
        <button className="next" onClick={this.goToNextSlide}>
          Next
        </button>
        <br />
        Index {this.state.currentIndex}
        <div className="label-selection">
          <h3>Select labels from below</h3>
          <select multiple onChange={this.handleLabelSelected}>
            {label}
          </select>
        </div>
        <button className="save" onClick={this.handleSave}>
          Save
        </button>
        <br />
        <Files
          onChange={files => {
            this.fileReader.readAsText(files[0]);
          }}
          onError={err => console.log(err)}
          accepts={[".json"]}
          multiple
          maxFiles={3}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Click here to upload
        </Files>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
