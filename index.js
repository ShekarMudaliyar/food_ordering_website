const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const session = require("express-session");
const store = require("store");
const nodemailer = require("nodemailer");
const keys = require("./config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

const app = express();
const port = 3000;
var router = express.Router();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "shekar",
  database: "streetcafe"
});
var urlencodedParser = bodyparser.urlencoded({ extended: false });
app.set("view engine", "ejs");
app.use(express.json());

db.connect(err => {
  if (err) {
    console.dir(err);
  } else {
    console.dir("mysql connected");
  }
});
app.use(session({ secret: "shekar" }));
app.use("/css", express.static("views/css"));
app.use("/images", express.static("views/images"));
app.use("/js", express.static("views/js"));
// var user = JSON.parse(localStorage.getItem("user"));

app.get("/", (req, res) => {
  if (store.get("user") != null) {
    console.log(store.get("user"));
    res.render("welcome", { user: store.get("user") });
  } else {
    console.log("no user");
    res.render("index");
  }
  // console.log(user);
});

app.post("/auth", urlencodedParser, (req, res) => {
  let uname = req.body.Uname;
  let pass = req.body.Cpwd;
  let sql = 'select * from customer where email= "' + uname + '"';
  let query = db.query(sql, (err, result) => {
    var authcred = result[0];
    if (err) {
      console.dir("some err" + err);
    } else {
      if (result.length > 0) {
        if (authcred.pass == pass) {
          console.dir(`user exists`);
          // localStorage.setItem("user", JSON.stringify(email));
          store.set("user", uname);
          req.session.user = uname;
          console.dir(result);
          res.redirect("/");
        } else {
          console.dir("email password doesnt not match");
          res.redirect("/login");
        }
      } else {
        console.dir("user doesnt exists");
        res.redirect("/login");
      }
    }
  });
});

app.post("/authadmin", urlencodedParser, (req, res) => {
  let uname = req.body.uname;
  let pass = req.body.Apwd;
  let sql = 'select * from admin where email= "' + uname + '"';
  let query = db.query(sql, (err, result) => {
    var authcred = result[0];
    if (err) {
      console.dir("some err" + err);
    } else {
      if (result.length > 0) {
        if (authcred.pass == pass) {
          console.dir(`user exists`);
          console.dir(result);
          res.redirect("/adminpage");
        } else {
          console.dir("email password doesnt not match");
          res.render("admin");
        }
      } else {
        console.dir("user doesnt exists");
        res.render("admin");
      }
    }
  });
});

app.post("/registeruser", urlencodedParser, (req, res) => {
  let uname = req.body.Uname;
  let pass = req.body.Cpwd;
  let cpass = req.body.CRepwd;
  let cno = req.body.CNo;
  let name = req.body.CName;
  let email = req.body.CEmail;
  let address = req.body.CAdd;
  db.query(`select * from customer where email="${email}"`, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      console.dir("email already exists");
      res.render("signin");
    } else {
      let sql = `insert into customer(fname,address,cnum,email,uname,pass)values("${name}","${address}",${cno},"${email}","${uname}","${pass}")`;
      if (pass == cpass) {
        let query = db.query(sql, (err, result) => {
          if (err) throw err;
          else {
            if (result.affectedRows > 0) {
              console.dir("user added");
              res.redirect("/login");
            } else {
              console.dir("error in registering user");
              res.render("signin");
            }
          }
        });
      } else {
        console.dir("password doesnt match");
      }
    }
  });
});

app.post("/reserve", urlencodedParser, (req, res) => {
  let name = req.body.CName;
  let email = req.body.CEmail;
  let cno = req.body.CNo;
  let date = req.body.datetime;
  let no_p = req.body.PNo;
  let sql = `insert into reservation(cname,email,cno,nopeople,datetime)values("${name}","${email}",${cno},"${no_p}","${date}")`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    else {
      if (result.affectedRows > 0) {
        console.dir("reserved");
        res.render("index");
      } else {
        console.dir("not reserved");
        res.render("reservation");
      }
    }
  });
});
app.get("/proceed", urlencodedParser, (req, res) => {
  let user = store.get("user");
  if (user != null) {
    console.log(store.get("user"));
    res.redirect("/payment");
  } else {
    console.log("no user");
    res.redirect("/loginforpayment");
  }
});
app.post("/getitems", urlencodedParser, (req, res) => {
  console.dir(req.body);
  store.set("items", req.body);
});
app.get("/loginforpayment", urlencodedParser, (req, res) => {
  res.render("loginpay");
});
app.post("/authforpay", urlencodedParser, (req, res) => {
  let uname = req.body.Uname;
  let pass = req.body.Cpwd;
  let sql = 'select * from customer where email= "' + uname + '"';
  let query = db.query(sql, (err, result) => {
    var authcred = result[0];
    if (err) {
      console.dir("some err" + err);
    } else {
      if (result.length > 0) {
        if (authcred.pass == pass) {
          console.dir(`user exists`);
          // localStorage.setItem("user", JSON.stringify(email));
          store.set("user", uname);
          req.session.user = uname;
          console.dir(result);
          res.redirect("/payment");
        } else {
          console.dir("email password doesnt not match");
          res.redirect("loginforpayment");
        }
      } else {
        console.dir("user doesnt exists");
        res.redirect("loginforpayment");
      }
    }
  });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/about", (req, res) => {
  res.render("aboutus");
});
app.get("/contact", (req, res) => {
  res.render("contactus");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});
app.get("/reservation", (req, res) => {
  res.render("reservation");
});
app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get("/payment", (req, res) => {
  // console.dir(store.get("items"));
  res.render("payment");
});
app.get("/order", (req, res) => {
  let sql = "select * from dishes";
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.dir("some err" + err);
    } else {
      if (result.length > 0) {
        // console.log(result);
        res.render("order", { data: result });
      } else {
        // res.render("order");
      }
    }
  });
});
app.get("/cart", (req, res) => {
  res.render("cart");
});
app.post("/paymentoption", urlencodedParser, (req, res) => {
  if (req.body.optradio == "card") {
    res.redirect("/card");
  } else {
    res.redirect("/cod");
  }
});
app.get("/cod", (req, res) => {
  res.render("cod");
});
app.get("/card", (req, res) => {
  let uname = store.get("user");
  let sql = 'select * from customer where email= "' + uname + '"';
  let query = db.query(sql, (err, result) => {
    var authcred = result[0];
    if (err) {
      console.dir("some err" + err);
    } else {
      var items = store.get("items");
      let total = 0.0;
      items.map(element => {
        total += parseFloat(element.price);
      });
      store.set("total", total);
      store.set("authcred", authcred);
      // console.dir(authcred);
      // console.dir(items);
      // console.dir(total);
      res.render("card", {
        details: authcred,
        items: items,
        total: total,
        key: keys.stripePublicKey
      });
    }
  });
});
app.post("/checkout", urlencodedParser, (req, res) => {
  var amount = parseFloat(store.get("total"));
  // console.log(amount * 100);
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => {
      stripe.charges
        .create({
          amount: amount * 100,
          description: "food",
          currency: "inr",
          customer: customer.id
        })
        .then(() => {
          let details = store.get("authcred");
          let total = parseInt(store.get("total"));
          let items = store.get("items");
          let itemsarr = "";
          items.map(element => {
            itemsarr += element.name + ",";
          });
          console.dir(itemsarr, details, total);
          let sql = `insert into orders(email,name,address,cnum,items,total)values("${
            details.email
          }","${details.fname}","${details.address}",${
            details.cnum
          },"${itemsarr}",${total})`;
          let query = db.query(sql, (err, result) => {
            if (err) throw err;
            else {
              if (result.affectedRows > 0) {
                console.dir("order placed");
                res.redirect("/success");
              } else {
                console.dir("cannot place order");
                res.send("cannot place order");
              }
            }
          });
        });
    });
  // res.send(req.body);
});
app.get("/success", (req, res) => {
  res.send("success");
});

app.get("/adminpage", (req, res) => {
  let sql = "select * from orders order by id desc";
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.dir("some err" + err);
    } else {
      res.render("adminpage", { results: result });
    }
  });
});
app.get("/fpass", (req, res) => {
  res.render("fpass");
});
app.get("/changepass", (req, res) => {
  res.render("fpass3");
});
app.post("/resetpass", urlencodedParser, (req, res) => {
  let email = req.body.email;
  let pass = req.body.Cpwd;
  let cpass = req.body.CRepwd;
  if (pass === cpass) {
    let sql = `update customer set pass="${pass}" where email="${email}"`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      else {
        if (result.affectedRows > 0) {
          console.dir("changed");
          res.redirect("/");
        } else {
          console.dir("not changed");
          res.redirect("/changepass");
        }
      }
    });
  }
});
app.post("/getemail", urlencodedParser, (req, res) => {
  console.dir(req.body.CEmail);
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "youremail@gmail.com",
      pass: "yourpass"
    }
  });

  var mailOptions = {
    from: "youremail@gmail.com",
    to: "senderemail@gmail.com",
    subject: "Email to reset your Street Caht Cafe Account Password",
    text: "That was easy! => http://localhost:3000/changepass"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send("<h1>Check Your email</h1>");
    }
  });
});
app.get("/gallery", (req, res) => {
  res.render("gallery");
});
app.get("/menu", (req, res) => {
  res.render("menu");
});
app.get("/terms", (req, res) => {
  res.render("terms");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
