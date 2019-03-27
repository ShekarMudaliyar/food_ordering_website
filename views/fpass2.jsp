<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
         <title>FORGOT PASSWORD</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
         <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> 
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
         <link href="css/fpass.css" rel="stylesheet" type="text/css"/>
         
  
        
    
    </head>
    <body>
        <div>
      <div class="container-fluid bg" >
  <div class="page-header">  
      <h1 style="text-align: center; color: white"><b>STREET CHAT CAFE</b></h1> 
      <h4 style="text-align: center; color:white; font-family: verdana"><i>Good Food,Good Mood..</i></h4>
  </div>         
 
  <div>
    <nav class="navbar navbar-inverse navbar-fixed" style="color: #FAF7F7">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#" style="font-family: Comic Sans MS">STREET CHAT CAFE</a>
    </div>
    <ul class="nav navbar-nav">
      <li><a href="index.jsp">Home</a></li>
      <li><a href="AboutUs.jsp">About Us</a></li>
      <li><a href="ContactUS.jsp">Contact US</a></li>
      <li><a href="#">Gallery</a></li>
      <li><a href="#">Menu Card</a></li>
    </ul>
  </div>
</nav>
  </div>
          <div class="row">
              <div class="col-md-4 col-sm-4 col-xs-12"></div>
              <div class="col-md-4 col-sm-4 col-xs-12">
                  <form class="form-container" action="fpass3.jsp" method="post" >
            <div class="text-muted">
            <h2 style="color:white">Forgot Password</h2>
            <hr>
            </div>
             <div class="form-group">
                <label for="exampleInputName">OTP</label>
                <input type="text" class="form-control" id="exampleInputName" name="otp" placeholder="Enter OTP">
              </div> 
             <div class="clearfix">
                <!--<button type="button" class="cancelbtn">Cancel</button-->
                <a href=""><button type="submit" class="signupbtn">Submit</button></a>
              </div>
    </div>
         </div>
          
      
        </div>
      </div>  
    </body>
</html>
