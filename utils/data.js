// By default weights are in pounds.
const engineList = [
    {
        engine: "Select Engine",
        teffort: "",
        engineWeight: "",
        tenderWeight: "",
        tenderAvailable: false
    },
    {
        engine: "CLIMAX",
        teffort: 17210,
        engineWeight: 53339,
        tenderWeight: 0,
        tenderAvailable: false
    },
    {
        engine: "D&RG CLASS 70",
        teffort: 15468,
        engineWeight: 74105,
        tenderWeight: 20095,
        tenderAvailable: true
    },
    {
        engine: "HEISLER",
        teffort: 13010,
        engineWeight: 61871,
        tenderWeight: 0,
        tenderAvailable: false
    },
    {
        engine: "COOKE MOGUL",
        teffort: 11872,
        engineWeight: 58177,
        tenderWeight: 21602,
        tenderAvailable: true
    },
    {
        engine: "EUREKA",
        teffort: 5620,
        engineWeight: 37840,
        tenderWeight: 13200,
        tenderAvailable: true
    },
    {
        engine: "PORTER 1 (BETSY)",
        teffort: 2870,
        engineWeight: 15965,
        tenderWeight: 0,
        tenderAvailable: false
    },
    {
        engine: "PORTER 2",
        teffort: 2870,
        engineWeight: 17956,
        tenderWeight: 0,
        tenderAvailable: false
    },
    {
        engine: "HANDCAR",
        teffort: 112,
        engineWeight: 2200,
        tenderWeight: 0,
        tenderAvailable: false
    }
]

//FrightList container

const frightList = [
    {
        fright: "",
        frightCarWeight: "",
    },
    {
        frightCar: "Flatcar - Rounds",
        frightCarWeight: 8360,
    },
    {
        frightCar: "Flatcar - Stakes",
        frightCarWeight: 8800,
    },
    {
        frightCar: "Flatcar - Bulkhead",
        frightCarWeight: 9020,
    },
    {
        frightCar: "Hopper",
        frightCarWeight: 13200,
    },
    {
        frightCar: "Tanker",
        frightCarWeight: 30135,
    },
    {
        frightCar: "Box Car",
        frightCarWeight: 17463,
    },
    {
        frightCar: "Bobber Caboose",
        frightCarWeight: 11880,
    },
]


//CargoList container
const cargoList = [
    {
        cargoType: "Select Cargo",
        unitPercar: 0,
        unitWeight: 0,
        frightCar: ""
    },
    {
        cargoType: "Logs",
        unitPercar: 6,
        unitWeight: 4409,
        frightCar: "Flatcar - Rounds"
    },
    {
        cargoType: "Cordwood",
        unitPercar: 8,
        unitWeight: 2645,
        frightCar: "Flatcar - Bulkhead"
    },
    {
        cargoType: "Lumber",
        unitPercar: 6,
        unitWeight: 2976,
        frightCar: "Flatcar - Stakes"
    },
    {
        cargoType: "Beam",
        unitPercar: 3,
        unitWeight: 3108,
        frightCar: "Flatcar - Stakes"
    },
    {
        cargoType: "Raw Iron",
        unitPercar: 3,
        unitWeight: 3284,
        frightCar: "Flatcar - Stakes"
    },
    {
        cargoType: "Rail",
        unitPercar: 10,
        unitWeight: 1984,
        frightCar: "Flatcar - Stakes"
    },
    {
        cargoType: "Steel Pipe",
        unitPercar: 9,
        unitWeight: 3968,
        frightCar: "Flatcar - Rounds"
    },
    {
        cargoType: "Oil Barrel",
        unitPercar: 46,
        unitWeight: 302,
        frightCar: "Flatcar - Bulkhead"
    },
    {
        cargoType: "Iron Ore",
        unitPercar: 10,
        unitWeight: 2204,
        frightCar: "Hopper"
    },
    {
        cargoType: "Coal",
        unitPercar: 10,
        unitWeight: 2204,
        frightCar: "Hopper"
    },
    {
        cargoType: "Crude Oil",
        unitPercar: 12,
        unitWeight: 2204,
        frightCar: "Tanker"
    },
    {
        cargoType: "Crate Tools",
        unitPercar: 32,
        unitWeight: 220,
        frightCar: "Box Car"
    },
    {
        cargoType: "Bobber Caboose",
        unitPercar: 1,
        unitWeight: 0,
        frightCar: "Bobber Caboose"
    },
]