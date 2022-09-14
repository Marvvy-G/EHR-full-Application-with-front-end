//Routes
const 
userRoute        = require("./routes/user"),
authRoute        = require("./routes/auth"),
productRoute     = require("./routes/products"),
cartRoute        = require("./routes/cart"),
orderRoute       = require("./routes/order"),
authPatientRoute = require("./routes/authpatient"),
patientRoute     = require("./routes/patient"),
doctorRoute      = require("./routes/doctor"),
pharmacyRoute    = require("./routes/pharmacy"),
historyRoute     = require("./routes/history"),
labProductsRoute = require("./routes/labProducts"),
labOrdersRoute   = require("./routes/labOrders"),
labRoute         = require("./routes/lab")
//technologies
const 
express    = require ("express"),
app        = express(),
bodyParser = require("body-parser"),
cookieParser= require("cookie-parser"),
session    = require("express-session")
flash      = require("connect-flash"),
mongoose   = require("mongoose"),
methodOverride = require("method-override");
dotenv     = require("dotenv")

dotenv.config(); 

//Database connection
//change database and deploy
// mongoose.connect("mongodb+srv://bellsehr:password1234@bellsehr.bwuj4eh.mongodb.net/?retryWrites=true&w=majority");
mongoose.connect("mongodb://localhost/authdemonew");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser('SecretStringForCookies'));
app.use(session({ 
    secret: "SecretStringForSession",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//Routes Application
app.use("/api/pharmacy/", pharmacyRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/authpatient", authPatientRoute);
app.use("/api/patient", patientRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/history", historyRoute);
app.use("/api/labProducts/", labProductsRoute);
app.use("/api/labOrders",labOrdersRoute);
app.use("/api/lab", labRoute);

app.get("/", function(req, res){
    res.render("home")
});

const port = process.env.PORT || 4000 ;

app.listen(port, function(){
    console.log("ehr server side");
    });