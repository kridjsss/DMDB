<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
<title>Data Migration Dashboard</title>
<link rel="shortcut icon" href="${pageContext.request.contextPath}/assets/images/winstream_min_logo.png" type="image/png">
</head>

<body class="w3-container">

<h2>Data Migration Dashboard</h2>

<button onclick="document.getElementById('id01').style.display='block'" class="w3-btn w3-green w3-large">Login</button>

<div id="id01" class="w3-modal">
  <span onclick="document.getElementById('id01').style.display='none'" 
  class="w3-closebtn w3-hover-red w3-container w3-padding-hor-16 w3-display-topright w3-xxlarge">&times;</span>
  <div class="w3-modal-content w3-card-8 w3-animate-zoom" style="max-width:600px">
  
    <div class="w3-center"><br>
      <img src="${pageContext.request.contextPath}/assets/images/login_avatar.png" alt="Avatar" style="width:40%" class="w3-round-jumbo w3-margin-top">
    </div>

    <div class="w3-container">
      <form class="w3-section" action='${pageContext.request.contextPath}/authenticate' method='post'>
        <label><b>Username</b></label>
        <input name='username' class="w3-input w3-border w3-hover-border-black w3-margin-bottom" type="text" placeholder="Enter Username" required>

        <label><b>Password</b></label>
        <input name='password' class="w3-input w3-border w3-hover-border-black" type="text" placeholder="Enter Password" required>
        
        <input type= 'submit' class="w3-btn w3-btn-block w3-green w3-section" value='Login'>
        <input class="w3-check" type="checkbox" checked="checked"> Remember me
      </form>
    </div>

    <div class="w3-container w3-border-top w3-padding-hor-16 w3-light-grey">
      <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-btn w3-red">Cancel</button>
      <span class="w3-right w3-padding w3-hide-small">Forgot <a href="#">password?</a></span>
    </div>

  </div>
</div>

</body>
</html>