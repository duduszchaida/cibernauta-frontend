import GameObject from "../Elements/GameObject";
import ScrollBar from "../Elements/ScrollBar";
import Timer from "../Elements/Timer";
import Position from "../Position";
import { Utils } from "../Utils";
import Scene from "../Scenes/Scene";
import EmailComponent from "./EmailComponent";
import EmailTextComponent from "./EmailTextComponent";
import Toolbar from "./Toolbar";
import { EmailList } from "./EmailList";
import { LEVELSELECTION } from "../Scenes/SceneReferences";
import { ExitButton } from "../Elements/ExitButton";
import Email, {
  ADDRESS,
  MALICIOUS,
  NAME,
  PICTURE,
  SAFE,
  SPAM,
  type AnomalyList,
  type EmailData,
} from "./Email";
import { PauseButton } from "../Elements/PauseBtn";
import { PauseScreen } from "./PauseScreen";

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
  email: Email | null = null;
  scrollBar: ScrollBar | null = null;
  toolBar: Toolbar | null = null;
  timer: Timer | null = null;
  toolButtons: GameObject[] = [btnFactory(SAFE)];
  buttonNames: string[];
  emailList: EmailData[];
  paused: boolean = false;
  pausedObjectList: GameObject[];
  unpausedObjectList: GameObject[];
  pauseButton = new PauseButton();

  selectedAnomalies: AnomalyList = {
    name: false,
    content: false,
    address: false,
    picture: false,
  };
  [PICTURE]: EmailComponent = new EmailComponent({
    pos: new Position(8, 8),
    height: 32,
    width: 32,
    anomaly: true,
    reference: PICTURE,
  });
  [ADDRESS] = new EmailTextComponent({
    pos: new Position(4, 13),
    font: "minecraftia",
    color: "light_brown",
    text: "<>",
    reference: ADDRESS,
    anomaly: false,
  });
  [NAME] = new EmailTextComponent({
    pos: new Position(42, 10),
    font: "wcp",
    color: "brown",
    text: "name",
    reference: "address",
    anomaly: false,
  });

  constructor(args: {
    email?: Email;
    buttonNames?: string[];
    emailListKey: string;
    tutorial?: boolean;
  }) {
    super({
      backgroundSpriteName: "bg_beige",
      gameObjects: [],
    });
    this.unpausedObjectList = [];
    this.pausedObjectList = [
      new PauseScreen(),
      emailBorder,
      new ExitButton(LEVELSELECTION),
      this.pauseButton,
    ];
    if (!args.tutorial) {
      this.timer = new Timer({ goalSecs: 300, pos: new Position(293, 4) });
      this.pausedObjectList.push(this.timer);
    }
    this.emailList = [...EmailList[args.emailListKey]];
    this.buttonNames = args.buttonNames ?? [MALICIOUS, SPAM];
    this.nextEmail(args.email);
  }

  generateEmail(email?: Email) {
    if (!email) {
      if (this.emailList.length == 0) {
        this.endEmails();
        return;
      }
      let randId = Utils.randomArrayId(this.emailList);
      this.email = new Email(this.emailList[randId]);
      this.emailList.splice(randId, 1);
      this.timer?.start();
    } else {
      this.email = email;
    }
    const emailContent = this.email.emailContent;
    this[PICTURE] = new EmailComponent({
      pos: new Position(8, 8),
      spriteName: this.email.picture,
      height: 32,
      width: 32,
      anomaly: true,
      reference: PICTURE,
    });
    this[NAME] = new EmailTextComponent({
      pos: new Position(44, 10),
      font: "wcp",
      color: "brown",
      text: "De: " + this.email.senderName,
      reference: NAME,
      anomaly: false,
    });
    this[ADDRESS] = new EmailTextComponent({
      pos: new Position(44, 28),
      font: "minecraftia",
      color: "light_brown",
      text: this.email.senderAddress,
      reference: ADDRESS,
      anomaly: false,
    });

    this.scrollBar = new ScrollBar(
      emailContent.textHeight,
      emailContent.scrollShiftAmmount,
    );
    this.toolBar = new Toolbar();
    this.gameObjects.push(emailContent);
    this.gameObjects.push(selectCover);
    this.gameObjects.push(this[PICTURE]);
    this.gameObjects.push(this[NAME]);
    this.gameObjects.push(this[ADDRESS]);
    if (this.email.emailContent.hasScroll) {
      this.gameObjects.push(this.scrollBar);
    }
    this.gameObjects.push(this.toolBar);
    this.toolButtons.forEach((b) => {
      this.gameObjects.push(b);
    });
  }

  nextEmail(email: Email | undefined = undefined) {
    this.generateToolButtons(this.buttonNames);
    this.selectedAnomalies = {
      name: false,
      content: false,
      address: false,
      picture: false,
    };
    this.gameObjects = [];
    this.generateEmail(email);
    this.gameObjects = [
      ...this.gameObjects,
      emailBorder,
      new ExitButton(LEVELSELECTION),
      this.pauseButton,
    ];
    if (this.timer) {
      this.gameObjects.push(this.timer);
    }
  }

  endEmails() {
    this.gameObjects = [emailBorder, new ExitButton(LEVELSELECTION)];
  }

  scrollEmail(scroll: number) {
    this.email?.emailContent.scroll(scroll);
    this.scrollBar?.scroll(scroll);
  }

  scrollEmailTo(scroll: number) {
    this.email?.emailContent.scrollTo(scroll);
    this.scrollBar?.scrollTo(scroll);
  }

  selectAnomaly(reference: string) {
    if (this[PICTURE].reference == reference) {
      this[PICTURE].selected = !this[PICTURE].selected;
    }
    if (this[ADDRESS].reference == reference) {
      this[ADDRESS].selected = !this[ADDRESS].selected;
    }
    if (this[NAME].reference == reference) {
      this[NAME].selected = !this[NAME].selected;
    }
    this.selectedAnomalies[reference] = !this.selectedAnomalies[reference];
  }

  selectParagraph(paragraphId: number) {
    if (this.email) {
      if (this.email.emailContent.selectedParagraph != paragraphId) {
        this.email.emailContent.selectedParagraph = paragraphId;
      } else {
        this.email.emailContent.selectedParagraph = null;
      }
    }
  }

  inspectModeSwitch() {
    if (this.toolBar) {
      this.toolBar.open = !this.toolBar.open;
      this.toolButtons.forEach((b) => {
        b.invisible = !this.toolBar?.open;
      });
    }
  }

  compareAnomalies(): AnomalyList {
    if (!this.email) {
      alert("No email");
      return {};
    }
    const result: AnomalyList = {}; // A list of anomalies and if they were correctly evaluated or not
    const seenAnomalies: string[] = [];
    console.log(this.selectedAnomalies);
    console.log(this.email.anomalies);
    for (const a in this.selectedAnomalies) {
      if (seenAnomalies.includes(a)) {
        continue;
      }
      result[a] = this.selectedAnomalies[a] == this.email.anomalies[a];
      seenAnomalies.push(a);
    }
    for (const a in this.email.anomalies) {
      if (seenAnomalies.includes(a)) {
        continue;
      }
      result[a] = this.selectedAnomalies[a] == this.email.anomalies[a];
      seenAnomalies.push(a);
    }
    return result;
  }

  generateToolButtons(buttonNames: string[] | null) {
    this.toolButtons = [btnFactory(SAFE)];
    if (buttonNames == null) {
      return;
    }
    buttonNames.forEach((n) => {
      switch (n) {
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
    if (!this.email) {
      return;
    }
    let evaluation = this.compareAnomalies();
    evaluation.content = this.email?.paragraphCheck();
    evaluation.class = classification == this.email.class;
    console.table(evaluation);
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
