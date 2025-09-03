const glossary = [
      {
    term: "鲁虺在线小游戏",
    definition:
      "甄选由世界各地最优秀的游戏开发人员制作的在线游戏。立即在鲁虺在线小游戏上玩在线游戏。玩免费在线游戏的最佳网站！ 即时游戏。不用下载。风靡的游戏。超过 1000 款游戏。1000+ 款官方游戏。在任何地方玩。官方游戏。1000+ 款在线游戏。不用注册。游戏和学习。",
    link: "http://www.luhui.net/games/",
    image: "http://mini.s-shot.ru/1024x768/400/jpeg/?http://www.luhui.net",
    tags: ["作者：鲁虺"]
  },
  
  
  {
    term: "鲁虺游戏网",
    definition:
      "甄选由世界各地最优秀的游戏开发人员制作的在线游戏。立即在鲁虺在线小游戏上玩在线游戏。玩免费在线游戏的最佳网站！ 即时游戏。不用下载。风靡的游戏。超过 1000 款游戏。1000+ 款官方游戏。在任何地方玩。官方游戏。1000+ 款在线游戏。不用注册。游戏和学习。",
    link: "http://game.luhui.net",
    image: "http://mini.s-shot.ru/1024x768/400/jpeg/?http://game.luhui.net",
    tags: ["作者：鲁虺"]
  },
  
  {
    term: "鲁虺微信小游戏",
    definition:
      "鲁虺微信小游戏",
    link: "http://weixin.luhui.net",
    image: "http://mini.s-shot.ru/1024x768/400/jpeg/?http://weixin.luhui.net",
    tags: ["作者：鲁虺"]
  },
  
 
  {
    term: "鲁虺游戏网",
    definition:
      "甄选由世界各地最优秀的游戏开发人员制作的在线游戏。立即在鲁虺在线小游戏上玩在线游戏。玩免费在线游戏的最佳网站！ 即时游戏。不用下载。风靡的游戏。超过 1000 款游戏。1000+ 款官方游戏。在任何地方玩。官方游戏。1000+ 款在线游戏。不用注册。游戏和学习。",
    link: "http://games.luhui.net",
    image: "http://mini.s-shot.ru/1024x768/400/jpeg/?http://games.luhui.net",
    tags: ["作者：鲁虺"]
  },
 
  
  
 
  {
    term: "鲁虺游戏网",
    definition:
      "甄选由世界各地最优秀的游戏开发人员制作的在线游戏。立即在鲁虺在线小游戏上玩在线游戏。玩免费在线游戏的最佳网站！ 即时游戏。不用下载。风靡的游戏。超过 1000 款游戏。1000+ 款官方游戏。在任何地方玩。官方游戏。1000+ 款在线游戏。不用注册。游戏和学习。",
    link: "http://youxi.luhui.net",
    image: "http://mini.s-shot.ru/1024x768/400/jpeg/?http://youxi.luhui.net",
    tags: ["作者：鲁虺"]
  },
 
  
  
  {
    term: "鲁虺FC游戏模拟器",
    definition:
      "线上鲁虺FC游戏模拟器，鲁虺NES游戏文件模拟器是一种软件程序，可以通过浏览器在你的计算机或其他电子设备上运行原始的NES游戏。NES（Nintendo Entertainment System）是任天堂公司于1985年推出的一款家用电子游戏机，FC游戏是指Family Computer游戏的简称，也就是我们通常所说的红白机游戏。",
    link: "http://fc.luhui.net",
    image: "http://mini.s-shot.ru/1024x768/400/jpeg/?http://luhui.net/games/fc/",
    tags: ["作者：卡森粒"]
  }
 
];

const content = document.getElementById("content");
const searchForm = document.getElementById("search-form");

function renderGlossary(glossary) {
  content.innerHTML = "";
  glossary.forEach(item => {
    const div = document.createElement("div");
    div.className = "term";

    // 创建一个外部链接包裹整个 div 内容
    const outerLink = document.createElement("a");
    outerLink.href = item.link;
    outerLink.target = "_blank";

    const h3 = document.createElement("h3");
    h3.innerText = item.term;
    const p = document.createElement("p");
    p.innerText = item.definition;

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.term; // 添加 alt 属性
      outerLink.appendChild(img);
    }

    outerLink.appendChild(h3);
    outerLink.appendChild(p);
    div.appendChild(outerLink);

    // 将 tagDiv 添加到 div 中，而不是 outerLink 中
    if (item.tags) {
      const tagDiv = document.createElement("div");
      tagDiv.className = "tags";
      item.tags.forEach(tag => {
        const span = document.createElement("span");
        span.innerText = tag;
        tagDiv.appendChild(span);
      });
      div.appendChild(tagDiv);
    }

    content.appendChild(div);
  });
}




function filterGlossary(query) {
  return glossary.filter(item => {
    const containsTerm = item.term.toLowerCase().includes(query.toLowerCase());
    const containsTag = item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    const containsDefinition = item.definition.toLowerCase().includes(query.toLowerCase()); // 检查定义部分是否包含搜索词
    return containsTerm || containsTag || containsDefinition;
  });
}


const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', updateGlossary);

function updateGlossary() {
	const query = searchInput.value;

	const filteredGlossary = filterGlossary(query);
	renderGlossary(filteredGlossary);
}

renderGlossary(glossary);













$(document).ready(function () {
	//img lazy loaded
	const observer = lozad();
	observer.observe();

	$(document).on('click', '.has-sub', function () {
		var _this = $(this)
		if (!$(this).hasClass('expanded')) {
			setTimeout(function () {
				_this.find('ul').attr("style", "")
			}, 300);

		} else {
			$('.has-sub ul').each(function (id, ele) {
				var _that = $(this)
				if (_this.find('ul')[0] != ele) {
					setTimeout(function () {
						_that.attr("style", "")
					}, 300);
				}
			})
		}
	})
	$('.user-info-menu .hidden-sm').click(function () {
		if ($('.sidebar-menu').hasClass('collapsed')) {
			$('.has-sub.expanded > ul').attr("style", "")
		} else {
			$('.has-sub.expanded > ul').show()
		}
	})
	$("#main-menu li ul li").click(function () {
		$(this).siblings('li').removeClass('active'); // 删除其他兄弟元素的样式
		$(this).addClass('active'); // 添加当前元素的样式
	});
	$("a.smooth").click(function (ev) {
		ev.preventDefault();

		public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass('mobile-is-visible');
		ps_destroy();

		var scrollTop = $($(this).attr("href")).offset().top;
		if (isMobile()) {
			scrollTop -= 80;
		} else {
			scrollTop -= 28;
		}

		$("html, body").animate({
			scrollTop: scrollTop
		}, {
			duration: 500,
			easing: "swing"
		});
	});

	function isMobile() {
		return $(window).width() < 768;
	}

	return false;
});

var href = "";
var pos = 0;
$("a.smooth").click(function (e) {
	$("#main-menu li").each(function () {
		$(this).removeClass("active");
	});
	$(this).parent("li").addClass("active");
	e.preventDefault();
	href = $(this).attr("href");
	pos = $(href).position().top - 30;
});



		// 复制按钮点击事件
		const shareSwitcherBtn = document.getElementById('share-switcher-btn');
		const sharePopup = document.getElementById('share-popup');
		const copyBtn = document.getElementById('copy-btn');
		
		// 显示/隐藏分享弹窗
		shareSwitcherBtn.addEventListener('click', function () {
		    // 获取按钮的位置
		    const rect = shareSwitcherBtn.getBoundingClientRect();
		    // 计算弹出窗口的位置
		    const popupLeft = rect.left - sharePopup.offsetWidth - 130; // 10px间隔
		    const popupTop = rect.top - 60; // 10px间隔;
		
		    // 设置弹出窗口的位置
		    sharePopup.style.left = `${popupLeft}px`;
		    sharePopup.style.top = `${popupTop}px`;
		
		    sharePopup.classList.toggle('show');
		});

		
		// 复制链接
		copyBtn.addEventListener('click', function () {
			const link = document.createElement('input');
			link.setAttribute('value', 'kugeceo');
			document.body.appendChild(link);
			link.select();
			document.execCommand('copy');
			document.body.removeChild(link);
			copyBtn.textContent = '复制成功';
			copyBtn.classList.add('success');
			setTimeout(function () {
				sharePopup.classList.remove('show');
				copyBtn.textContent = '扫码入群';
				copyBtn.classList.remove('success');
			}, 1000);
		});

// 3秒钟无操作后隐藏分享弹窗
let timeout;
document.addEventListener('click', function () {
	clearTimeout(timeout);
	timeout = setTimeout(function () {
		sharePopup.classList.remove('show');
		copyBtn.textContent = '扫码入群';
		copyBtn.classList.remove('success');
	}, 3000);
});



const backToTopBtn = document.querySelector('#back-to-top-btn');

window.addEventListener('scroll', () => {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		backToTopBtn.style.display = 'block';
	} else {
		backToTopBtn.style.display = 'none';
	}
});

backToTopBtn.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});


const languageSwitcherBtn = document.getElementById('language-switcher-btn');
		const currentPath = window.location.pathname;
		
		languageSwitcherBtn.addEventListener('click', () => {
		    if (currentPath.includes('/en/')) {
		        window.location.href = '../index.html';
		    } else {
		        window.location.href = 'en/index.html';
		    }
		});
		

function plusSlides(n) {
	clearTimeout(slideTimer);
	slideIndex += n;
	if (slideIndex > slides.length) {
		slideIndex = 1;
	} else if (slideIndex < 1) {
		slideIndex = slides.length;
	}
	for (var i = 0; i < slides.length; i++) {
		slides[i].classList.remove("active");
	}
	slides[slideIndex - 1].classList.add("active");
	slideTimer = setTimeout(showSlides, 10000);
}



// 控制侧边栏显示/隐藏的按钮
const menuToggle = document.querySelector('.menu-toggle');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const mainContents = document.querySelector('#main-contents');
const smoothLinks = document.querySelectorAll('.smooth');

menuToggle.addEventListener('click', () => {
	sidebarWrapper.classList.toggle('active');
	mainContents.classList.toggle('overlay');
});

// 关闭侧边栏的按钮
const closeBtn = document.querySelector('#sidebar .sidebar-header button.close');

closeBtn.addEventListener('click', () => {
	sidebarWrapper.classList.remove('active');
	mainContents.classList.remove('overlay');
});

// 点击遮罩层时关闭侧边栏的按钮
mainContents.addEventListener('click', function () {
	if (mainContents.classList.contains('overlay')) {
		sidebarWrapper.classList.remove('active');
		mainContents.classList.remove('overlay');
	}
});

smoothLinks.forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault(); // 阻止默认跳转行为
		const href = this.getAttribute('href');
		const target = document.querySelector(href);

		// 先关闭侧边栏
		sidebarWrapper.classList.remove('active');
		mainContents.classList.remove('overlay');

		// 然后执行Smooth Scroll的跳转
		target.scrollIntoView({
			behavior: 'smooth'
		});
	});
});



if (window.innerWidth <= 768 && window.innerHeight <= 1024) {
	var elements = document.querySelectorAll('[data-original-title]');

	for (var i = 0; i < elements.length; i++) {
		elements[i].removeAttribute('data-original-title');
	}
}


$(".main-menus").click(function (e) {
	e.preventDefault();
	$(this).parent().toggleClass("open").siblings().removeClass("open");
});



const buttons = document.querySelectorAll('.category-button');

buttons.forEach(button => {
	button.addEventListener('click', () => {
		buttons.forEach(b => b.classList.remove('active'));
		button.classList.add('active');
		generatePagination();
	});
});