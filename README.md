## Image Tagging App

### Install the app

```bash
docker build --rm -f "Dockerfile" -t tagging_app:latest .
```

### Run the app

Run the code below in terminal first.

```bash
bash docker_run.sh
```

Then head over to `http://localhost:3000/`.

### Project structure

```
.
├── src
│   ├── images <- images to be labelled
│   │   ├── 001.jpg
│   │   ├── ...
│   │   └── 989.jpg
│   ├── index.js
│   └── label_names.json <- image data label names
├── docker_run.sh
├── Dockerfile
└── README.md
```

### How to use

- Data preparation
  - put the images to be labeled in `./src/images`
  - create a json file called `label_names.json` that contains all the labels of the image data with the following structure, then put `label_names.json` under `./src/` .
    ```json
    [
      {
        "label_name": "boston_bull"
      },
      {
        "label_name": "lakeland_terrier"
      },
      {
        "label_name": "walker_hound"
      }
    ]
    ```
- App at `http://localhost:3000/`

  - click on `previous` and `next` to change images.
  - to select/ unselect multiple labels use the command key `⌘`.
  - click on `save` to save the labeled data. a json called `image_label.json` will be downloaded to your `Downloads` folder.

    ```json
    {
      "001.jpg": ["dingo"],
      "002.jpg": ["boston_bull", "dingo", "pekinese"],
      "989.jpg": ["dingo", "walker_hound"]
    }
    ```

  - to continue working on a `image_label.json` saved from before, click on `Click here to upload` to upload the labeled data and resume labeling.

### Things to note

- app supports only `jpg` and `png` images for now.
- if more labels are added to `label_names.json`, all images need to be relabelled using the latest `label_names.json` file, i.e. use `Click here to upload` to modify the `image_label.json` from the old label names.
- make sure that all images are put under `./src/images/` before starting labeling.
- if there are any new images to be labeled
  - delete all existing images in `./src/images` first.
  - then add the new images to `./src/images`.
  - start labeling again.
  - this will create two `image_label.json` files.
