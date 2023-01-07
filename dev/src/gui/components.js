import create from "./utilities/create.js";
import { createButton, selectMenuItem, selectMenuItem as selectPanel } from "./utilities/utilities.js";
import { create as createTooltip } from "./utilities/tooltip.js";
import { play as runLoop, pause as stopLoop } from "../pixi-adapter/renderer.js";
import Simulation from "../simulation/Simulation.js";
import Configuration from "../simulation/Configuration.js";
import { formatTime } from "../utilities/math.js";

let isBeforeStart = true;
const startMessage = create("p", "StartSimulationHint");
startMessage.textContent = "To start the simulation click the \"Play\" button.";
const renderer = create("div", "Renderer Sci-Fi-Border");
renderer.appendChild(startMessage);

const outputSpeedFactor = create("span", "SpeedFactor");
outputSpeedFactor.textContent = Simulation.speedFactor;

const updateSpeedOutput = () => {
    outputSpeedFactor.textContent = Simulation.speedFactor;
};
const buttonSlowDown = createButton(
    "Icon icon-backward2",
    () => {
        Simulation.speedFactor = Simulation.speedFactor / Configuration.speedMultiplier.current;
        updateSpeedOutput();
    },
    "Slow Down Simulation"
);
const buttonSpeedUp = createButton(
    "Icon icon-forward3",
    () => {
        Simulation.speedFactor = Simulation.speedFactor * Configuration.speedMultiplier.current;
        updateSpeedOutput();
    },
    "Speed Up Simulation"
);

const outputTimePassed = create("span", "TimePassed");
outputTimePassed.textContent = "00:00:00.00";

let buttonPause = null;
const buttonPlay = createButton(
    "Icon Play icon-play3 PulseEffect",
    () => {
        if (isBeforeStart) {
            isBeforeStart = false;
            startMessage.classList.add("Hidden");
            buttonPlay.classList.remove("PulseEffect");
        }
        buttonPlay.style.display = "none";
        buttonPause.style.display = "block";
        runLoop();
    },
    "Run Simulation"
);
buttonPause = createButton(
    "Icon icon-pause2",
    () => {
        buttonPause.style.display = "none";
        buttonPlay.style.display = "block";
        stopLoop();
    },
    "Pause Simulation"
);
buttonPause.style.display = "none";

// const buttonFinish = createButton(
//     "Icon Finish icon-switch",
//     () => {

//     },
//     "Finish Simulation"
// );

const controls = create("div", "Controls Sci-Fi-Border");
controls.append(
    buttonSlowDown,
    buttonPlay,
    buttonPause,
    buttonSpeedUp,
    outputSpeedFactor,
    outputTimePassed
    // buttonFinish
);

const visualization = create("div", "Visualization");
visualization.append(
    renderer,
    controls
);

const panelCharts = create("div", "Panel Active");
const panelOptions = create("div", "Panel");
const observedType = create("p", "Type");
const observedGenes = create("div", "Genes");
const panelObserver = create("div", "Panel");
panelObserver.append(observedType, observedGenes);
const panelHelp = create("div", "Panel");

const buttonCharts = createButton(
    "Icon Active icon-stats-bars",
    () => {
        selectMenuItem(buttonCharts);
        selectPanel(panelCharts);
    },
    "Show Charts"
);

const buttonOptions = createButton(
    "Icon icon-equalizer",
    () => {
        selectMenuItem(buttonOptions);
        selectPanel(panelOptions);
    },
    "Show Options"
);

const buttonFollow = createButton(
    "Icon icon-target",
    () => {
        selectMenuItem(buttonFollow);
        selectPanel(panelObserver);
    },
    "Show Individual Information"
);

const buttonHelp = createButton(
    "Icon icon-info",
    () => {
        selectMenuItem(buttonHelp);
        selectPanel(panelHelp);
    },
    "Show Individual Information"
);

const menu = create("div", "Menu Sci-Fi-Border");
menu.append(
    buttonCharts,
    buttonFollow,
    buttonOptions,
    buttonHelp
);

const panels = create("div", "PanelGroup Sci-Fi-Border");
panels.append(
    panelCharts,
    panelObserver,
    panelOptions,
    panelHelp
);

const evaluation = create("div", "Evaluation");
evaluation.append(
    menu,
    panels
);

const gui = create("div", "GUI Maximize");
gui.append(
    visualization,
    evaluation,
    createTooltip()
);

document.body.appendChild(gui);

const getChartsPanel = () => panelCharts;

const getRendererContainer = () => renderer;

const updateOberverPanel = (type, genes) => {
    if (panelObserver.classList.contains("Active")) {
        console.log(type, genes);
    }
};

const updateOutputTimePassed = () => {
    const msec = Simulation.timePassed;
    const timeString = formatTime(msec);
    outputTimePassed.textContent = timeString;
};

export {
    getChartsPanel,
    getRendererContainer,
    updateOberverPanel,
    updateOutputTimePassed
};
