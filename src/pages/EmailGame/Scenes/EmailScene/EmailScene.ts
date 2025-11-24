import EmailManager, {
  ADDRESS,
  CONTENT,
  MALICIOUS,
  NAME,
  PICTURE,
  SAFE,
  SPAM,
  type EmailData,
} from "./EmailManager";
import { PauseScreen } from "./PauseScreen";
import type { Level } from "../LevelSelectionScene/Level";
import { mailExample } from "./EmailList";
import GameObject from "../../Elements/GameObject";
import Scene from "../Scene";
import Toolbar from "./Toolbar";
import Timer from "../../Elements/Timer";
import { PauseButton } from "../../Elements/PauseBtn";
import Position from "../../Position";
import { LEVELSELECTION } from "../SceneReferences";
import { ExitButton } from "../../Elements/ExitButton";
import { Utils } from "../../Utils";

const emailBorder = new GameObject({
  spriteName: "email_border",
  width: 352,
  height: 256,
  ignoreClick: true,
});

const selectCover = new GameObject({
  height: 256,
  width: 352,
  spriteName: "email_selection_cover",
  ignoreClick: true,
});

export const JUDGEEMAIL = "judgeEmail";

export type Evaluation = {
  [PICTURE]: boolean | null;
  [ADDRESS]: boolean | null;
  [NAME]: boolean | null;
  [CONTENT]: boolean | null;
  class: boolean | null;
};

function btnFactory(btn: typeof SAFE | typeof MALICIOUS | typeof SPAM) {
  switch (btn) {
    case SAFE:
      return new GameObject({
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_safe",
        clickFunction: () => {
          return { type: JUDGEEMAIL, class: SAFE };
        },
      });
    case MALICIOUS:
      return new GameObject({
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_malicious",
        clickFunction: () => {
          return { type: JUDGEEMAIL, class: MALICIOUS };
        },
      });
    case SPAM:
      return new GameObject({
        height: 24,
        width: 24,
        invisible: true,
        spriteName: "btn_spam",
        clickFunction: () => {
          return { type: JUDGEEMAIL, class: SPAM };
        },
      });
  }
}

export default class EmailScene extends Scene {
  level: Level;
  emailManager: EmailManager = new EmailManager(mailExample);
  emailDataList: EmailData[] = [];
  toolBar!: Toolbar;
  timer: Timer;
  toolButtons: GameObject[] = [];
  paused: boolean = false;
  pausedObjectList: GameObject[];
  unpausedObjectList: GameObject[];
  pauseButton = new PauseButton();
  evaluations: { evaluation: Evaluation; emailData: EmailData }[] = [];
  timeEnded: boolean = false;

  constructor(level: Level) {
    super({
      backgroundSpriteName: "bg_beige",
      gameObjects: [],
    });
    this.level = level;
    this.emailDataList = [...level.emailDataList];
    this.timer = new Timer({
      goalSecs: 300,
      pos: new Position(293, 4),
      goalFunc: () => {
        this.timeEnded = true;
      },
    });
    this.unpausedObjectList = [];
    this.pausedObjectList = [
      new PauseScreen(),
      emailBorder,
      new ExitButton(LEVELSELECTION),
      this.pauseButton,
      this.timer,
    ];
    this.toolBar = new Toolbar();
    this.generateToolButtons();
    this.nextEmail(true);
  }

  generateEmail(emailData?: EmailData) {
    if (!emailData) {
      let randId = Utils.randomArrayId(this.emailDataList);
      emailData = this.emailDataList[randId];
      this.emailDataList.splice(randId, 1);
    }
    this.emailManager.newData(emailData);

    this.switchToolBar();
    this.gameObjects = [
      ...this.gameObjects,
      this.emailManager.emailContent,
      selectCover,
      this.emailManager[PICTURE],
      this.emailManager[NAME],
      this.emailManager[ADDRESS],
    ];
    if (this.emailManager.scrollBar) {
      this.gameObjects.push(this.emailManager.scrollBar);
    }
    this.gameObjects.push(this.toolBar);
    this.toolButtons.forEach((b) => {
      this.gameObjects.push(b);
    });
  }

  nextEmail(first: boolean = false) {
    this.gameObjects = [];
    this.generateEmail(first ? this.level.starterEmail : undefined);
    this.gameObjects = [
      ...this.gameObjects,
      emailBorder,
      new ExitButton(LEVELSELECTION),
      this.pauseButton,
      this.timer,
    ];
    if (!this.timer.started && !first) {
      this.timer.start();
    }
  }

  switchToolBar() {
    console.log("switch bar");
    this.toolBar.open = !this.toolBar.open;
    this.toolButtons.forEach((b) => {
      b.invisible = !this.toolBar?.open;
    });
  }

  generateToolButtons() {
    this.level.buttons.forEach((btn) => {
      switch (btn) {
        case SAFE:
          this.toolButtons.push(btnFactory(SAFE));
          break;
        case MALICIOUS:
          this.toolButtons.push(btnFactory(MALICIOUS));
          break;
        case SPAM:
          this.toolButtons.push(btnFactory(SPAM));
          break;
      }
    });
    this.toolButtons.forEach((b, i) => {
      b.pos.y = 222;
      b.pos.x = 42 + 32 * i;
    });
  }

  evaluateEmail(classification: typeof SAFE | typeof MALICIOUS | typeof SPAM) {
    this.evaluations.push({
      evaluation: this.emailManager.evaluate(classification),
      emailData: this.emailManager.emailData,
    });
  }

  pause() {
    this.paused = !this.paused;
    this.pauseButton.paused = !this.pauseButton.paused;
    if (this.paused) {
      this.unpausedObjectList = [...this.gameObjects];
      this.gameObjects = [...this.pausedObjectList];
    } else {
      this.gameObjects = [...this.unpausedObjectList];
    }
  }
}
