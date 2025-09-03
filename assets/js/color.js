        var colorSwitcherBtn = document.getElementById("color-switcher-btn");
	    var themeCssLink = document.getElementById("theme-css");
	    var logoExpandedImg = document.querySelector(".logo-expanded img");
	    var logoCollapsedImg = document.querySelector(".logo-collapsed img");
	
	    // 从localStorage中获取用户选择的配色方案
	    var savedTheme = localStorage.getItem("theme");
	    if (savedTheme === "dark") {
	        // 切换到暗色系主题
	        setDarkTheme();
	    }
	
	    colorSwitcherBtn.addEventListener("click", function () {
	        if (themeCssLink.href.endsWith("xenon-core.css")) {
	            // 切换到暗色系主题
	            setDarkTheme();
	        } else {
	            // 切换到白色主题
	            setLightTheme();
	        }
	    });
	
	    function setDarkTheme() {
	        themeCssLink.href = "assets/css/xenon-core-color.css";
	        logoExpandedImg.src = "assets/images/logo@4x.png";
	        logoCollapsedImg.src = "assets/images/logo-collapsed@3x.png";
	        // 将用户选择的配色方案保存到localStorage中
	        localStorage.setItem("theme", "dark");
	    }
	
	    function setLightTheme() {
	        themeCssLink.href = "assets/css/xenon-core.css";
	        logoExpandedImg.src = "assets/images/logo@2x.png";
	        logoCollapsedImg.src = "assets/images/logo-collapsed@2x.png";
	        // 将用户选择的配色方案保存到localStorage中
	        localStorage.setItem("theme", "light");
	    }
		
		
		    var sunIcon = document.querySelector(".sun-icon");
		    var moonIcon = document.querySelector(".moon-icon");
		
		    // 从localStorage中获取用户选择的配色主题
		    var savedThemes = localStorage.getItem("theme");
		    if (savedThemes === "dark") {
		         showSunIcon();// 如果是暗色主题，则显示月亮图标
		    } else {
		        showMoonIcon(); // 否则显示太阳图标
		    }
		
		    colorSwitcherBtn.addEventListener("click", function () {
		        if (sunIcon.style.display === "none") {
		            showSunIcon(); // 切换到白色主题，显示太阳图标
		        } else {
		            showMoonIcon(); // 切换到暗色主题，显示月亮图标
		        }
		    });
		
		    function showSunIcon() {
		        sunIcon.style.display = "inline-block";
		        moonIcon.style.display = "none";
		    }
		
		    function showMoonIcon() {
		        sunIcon.style.display = "none";
		        moonIcon.style.display = "inline-block";
		    }