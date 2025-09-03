const localData = [
    {
        "title": "既要AI也玩Web3，OpenAI创始人Sam Altman能复活“Libra”吗？",
        "link": "http://36kr.com/p/2251606591729283",
        "pubDate": "2023/5/10 14:35:58",
        "source": "司林威"
    }
];

const rssFeeds = [
	    "http://feed.hamibot.com/api/feeds/6140676b1269c358aa11037c", /* 经纬创投 */
	    "http://feed.hamibot.com/api/feeds/613381f91269c358aa0eac99", /* 机器之心 */
	    "http://feed.hamibot.com/api/feeds/616b942db9a7e049c3869ad3", /* 少数派 */
		"http://feed.hamibot.com/api/feeds/613381f91269c358aa0ead29", /* 量子位 */
		"http://feed.hamibot.com/api/feeds/61aa18e9486e3727fb090ba1", /* 新智元 */
		"http://feed.hamibot.com/api/feeds/6131e1441269c358aa0e2141", /* 36氪 */
		"http://feed.hamibot.com/api/feeds/6256962ba4ca6e10e366851b", /* 智东西 */
		"http://feed.hamibot.com/api/feeds/621321d4dca58a380c66b2ef", /* PaperWeekly */
		
	];

	const fetchData = async (url) => {
	    const proxyUrl = "http://api.allorigins.win/raw?url=" + encodeURIComponent(url);
	    const response = await fetch(proxyUrl);
	    const text = await response.text();
	    const parser = new DOMParser();
	    const xmlDoc = parser.parseFromString(text, "text/xml");
	    return xmlDoc;
	};
	
	function generateRandomNumbers(min, max, count) {
	  const numbers = new Set();
	
	  while (numbers.size < count) {
	    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
	    numbers.add(randomNumber);
	  }
	
	  return Array.from(numbers);
	}

	
	// 添加一个 loading 状态
	const loadingElement = document.getElementById("loading");
	loadingElement.style.display = "block";
	
	const combineFeeds = async () => {
	    // 现在我们将所有的网络请求并行处理
	    const feedPromises = rssFeeds.map(fetchData);
	    const feedDataArray = await Promise.all(feedPromises);
	    const allItems = [];
	    const keywords = ["AI", "人工智能", "AIGC", "GPT", "ChatGPT", "大模型", "元宇宙", "3D", "虚拟", "高精度", "OpenAi", "Midjourney", "Bing", "Prompt", "LLM", "NLP", "Stable"];
	
	    for (const feedData of feedDataArray) {
	        const items = feedData.querySelectorAll("item");
	
	        items.forEach((item) => {
	                const itemTitle = item.querySelector("title").textContent;
	                const itemLink = item.querySelector("link").textContent;
	                const itemPubDate = new Date(item.querySelector("pubDate").textContent);
	                const itemSource = feedData.querySelector("channel > copyright").textContent;
	        
	                const dateDifference = Math.ceil((new Date() - itemPubDate) / (1000 * 60 * 60 * 24));
	        
	                const containsKeyword = keywords.some(keyword => itemTitle.includes(keyword));
	        
	                if (dateDifference <= 15 && containsKeyword) {
	                    allItems.push({
	                        title: itemTitle,
	                        link: itemLink,
	                        pubDate: itemPubDate,
	                        source: itemSource
	                    });
	                }
	            });
	        }
	
	   // 添加本地数据
	   localData.forEach((item) => {
	       const itemTitle = item.title;
	       const itemLink = item.link;
	       const itemPubDate = item.pubDate;
	       const itemSource = item.source;
	   
	       const dateDifference = Math.ceil((new Date() - new Date(itemPubDate)) / (1000 * 60 * 60 * 24));
	   
	       const containsKeyword = keywords.some(keyword => itemTitle.includes(keyword));
	   
	       if (dateDifference <= 7 && containsKeyword) {  /* 设置显示最近7天文章 */
	           allItems.push({
	               title: itemTitle,
	               link: itemLink,
	               pubDate: new Date(itemPubDate),
	               source: itemSource
	           });
	       }
	   });
	
	    // 数据已经加载完成，隐藏 loading 状态
	    loadingElement.style.display = "none";
	    
	    return allItems;
	    };
	
	const searchInput = document.getElementById("search-input");
	
function formatDate(dateObj) {
    // 获取年、月、日、小时、分钟
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');  // 月份是从0开始的
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hour = dateObj.getHours().toString().padStart(2, '0');
    const minute = dateObj.getMinutes().toString().padStart(2, '0');

    // 返回格式化的日期字符串
    return `${year}-${month}-${day} ${hour}:${minute}`;
}

	

			const displayFeed = async (feedItems) => {
			  if (!feedItems) {
			    feedItems = await combineFeeds();
			  }
			
			  const container = document.getElementById("rss-feeds");
			
			  // 根据时间对所有项目进行排序，最新的项目排在最前面
			  feedItems.sort((a, b) => b.pubDate - a.pubDate);
			
			  const feedContainer = document.createElement("div");
			  feedContainer.className = "feed-container";
			  container.appendChild(feedContainer);
			
			  const imageCount = 100;
			  const randomNumbers = generateRandomNumbers(1, imageCount, feedItems.length);
			
			  // 使用 IntersectionObserver API 实现懒加载
			  const observer = new IntersectionObserver((entries, observer) => {
			    entries.forEach(entry => {
			      if (entry.isIntersecting) {
			        const lazyImage = entry.target;
			        lazyImage.src = lazyImage.dataset.src;
			        observer.unobserve(lazyImage);
			      }
			    });
			  });
			
			 feedItems.forEach((item, index) => {
			     const itemElement = document.createElement("div");
			     itemElement.className = "item";
			     itemElement.addEventListener("click", () => window.open(item.link, "_blank"));
			  
			     const imgElement = document.createElement("img");
			     imgElement.dataset.src = `assets/images/article/${randomNumbers[index]}.jpg`;
			     imgElement.alt = `article${randomNumbers[index]}`;
			     imgElement.classList.add("lazy");
			  
			     const titleElement = document.createElement("p");
			     titleElement.textContent = item.title;
			     titleElement.className = "title";
			     itemElement.appendChild(titleElement);
			 
			     const itemMeta = document.createElement("div");
			     itemMeta.className = "item-meta";
			  
			     const sourceElement = document.createElement("span");
			     sourceElement.textContent = "作者：" + item.source;
			     itemMeta.appendChild(sourceElement);
			  
			     const dateElement = document.createElement("span");
			     dateElement.textContent = formatDate(item.pubDate); // 先定义 dateElement，再设置其 textContent
			     itemMeta.appendChild(dateElement);
			  
			     observer.observe(imgElement);
			  
			     imgElement.addEventListener("load", () => {
			         imgElement.classList.add("lazy-loaded");
			     });
			  
			     itemElement.appendChild(imgElement);
			     itemElement.appendChild(titleElement);
			     itemElement.appendChild(itemMeta);
			     feedContainer.appendChild(itemElement);
			 });



			};



	searchInput.addEventListener("input", filterItems);
	displayFeed();
	
	
	async function filterItems() {
	    const query = searchInput.value.toLowerCase();
	    const items = await combineFeeds();
	    const filteredItems = items.filter(item => {
	        const containsTitle = item.title.toLowerCase().includes(query);
	        const containsPubDate = item.pubDate.toString().toLowerCase().includes(query);
	        const containsSource = item.source.toLowerCase().includes(query);
	
	        return containsTitle || containsPubDate || containsSource;
	    });
	
	    const container = document.getElementById("rss-feeds");
	    container.innerHTML = "";
	    displayFeed(filteredItems);
	}
	
	
	
	
	
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
	
	var slideIndex = 0;
	var slideTimer = null;
	
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
		});
	});