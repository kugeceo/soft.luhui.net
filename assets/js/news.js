const glossaryNews = [
		{
		"term": "鲁虺人工智能网已完成网页兼容性优化",
		"content":"鲁虺人工智能网已进行了一次全面的网页兼容性优化，目前鲁虺人工智能网 支持多种不同的设备。由于此次更新影响到了网站的诸多方面，可能会存在一些未知的页面排版问题。\n\n如果您在使用过程中遇到任何相关问题，无论问题的大小，我们都非常欢迎您向我们反馈；您的每一次反馈都是推动 鲁虺人工智能网 进步的重要动力，我们保证将尽快对您的反馈进行处理并优化。",
		"definition": "2023-05-31 15:50",
		"link": "http://ai.luhui.net/news.html"
		},
		{
		"term": "鲁虺绘画网站AIpix正式上线",
		"content":"由于需要保持整体UI一致性，鲁虺人工智能网的AI画廊，让不少设计方面的小伙伴对AI画廊的界面不太感冒，经过跟大家的沟通。\n\n我们推出了专门针对AI绘画的网站-熵绘: http://aiauu.com ，熵绘刚上线，还有不少地方需要优化，还请大家多提建议；目前会每天收录midjourney热门图片，并增加中文指令！",
		"definition": "2023-05-30 20:30",
		"link": "http://aipix.luhui.net"
		},
		
		{
		"term": "鲁虺人工智能网用户问卷调研，非常期待您的反馈",
		"content":"鲁虺人工智能网 自上线至今，致力于在不断优化改进中给用户提供最优质的服务。\n为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！\n\n点击原文链接参与！",
		"definition": "2023-05-23 14:00",
		"link": "http://luhui.net/zh/#s2/12327068/320d/"
		},
		
		{
		"term": "鲁虺人工智能网 上线 暗夜模式 功能",
		"content":"鲁虺人工智能网已上线 暗夜模式 功能，您可在页面的右下角点击切换模式，初次体验可能存在缓存，请多刷新几次浏览器；我们将持续收集用户意见，优化使用体验，如您有好的建议请联系我，微信：CryptoLife，感谢大家的支持!",
		"definition": "2023-05-22 22:30",
		"link": "http://ai.luhui.net/news.html"
		},
		
		{
		"term": "鲁虺人工智能网 上线 创意画廊 功能",
		"content":"鲁虺人工智能网已上线 创意画廊 功能，我们将持续收集全网优秀绘画创作，如您有好的绘画作品可联系我们提交收录，感谢大家的支持。",
		"definition": "2023-05-15 14:30",
		"link": "http://ai.luhui.net/news.html"
		},
		
		{
		"term": "鲁虺人工智能网 Prompts新增英文功能",
		"content":"自5月11日发起用户问卷调研以来，我们统计了大家的回答，根据分析，我们未来发展重点将在AI工具、Prompts、创作专题几个功能，后续将持续优化用户体验，新增功能内容；当前已支持Prompts英文查看复制，并按照优先级对菜单重新进行了排序；非常感谢大家的支持。",
		"definition": "2023-05-12 17:20",
		"link": "http://ai.luhui.net/news.html"
		},
		
		{
		"term": "鲁虺人工智能网1.0 正式上线，由ChatGPT与Paler共同研发",
		"content":"鲁虺人工智能网 是一款简单易用的AI辅助工具，旨在降低人工智能技术的使用门槛，助力推动 AI 的普及与应用。",
		"definition": "2023-4-29 09:20",
		"link": "http://ai.luhui.net/about.html"
		}
];

const announcementContainer = document.getElementById("announcement-container");
// 获取加载动画元素
const loadingElement = document.getElementById("loading");

// 在请求RSS数据之前显示加载动画
loadingElement.style.display = "block";

function createAnnouncementElement(announcement) {
    const div = document.createElement('div');
    div.className = 'welcome active';

    const span = document.createElement('span');
    span.textContent = '📣 ' + announcement.term;
    div.appendChild(span);

    const welcomeLink = document.createElement('a');
    welcomeLink.href = announcement.link;
    welcomeLink.className = 'welcome-link';
    div.appendChild(welcomeLink);

    return div;
}


		// helper function to format date
		function formatDate(d) {
		    let month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();
		
		    if (month.length < 2) 
		        month = '0' + month;
		    if (day.length < 2) 
		        day = '0' + day;
		
		    return [year, month, day].join('-');
		}
		
		// 定义搜索的关键词
		const keywords = ["AI", "人工智能", "AIGC", "GPT", "ChatGPT", "大模型", "元宇宙", "3D", "虚拟", "高精度", "OpenAi", "Midjourney", "Bing", "Prompt", "LLM", "NLP", "Stable"];
		
		function formatTime(time) {
		    let hour = '' + time.getHours();
		    let minute = '' + time.getMinutes();
		
		    if (hour.length < 2) 
		        hour = '0' + hour;
		    if (minute.length < 2) 
		        minute = '0' + minute;
		
		    return hour + ':' + minute;
		}


		async function getRssData(rssUrl) {
		  const proxyUrl = 'http://api.allorigins.win/raw?url=' + encodeURIComponent(rssUrl);
		  const response = await fetch(proxyUrl);
		  const text = await response.text();
		  const parser = new DOMParser();
		  const xmlDoc = parser.parseFromString(text, "text/xml");
		
		  const items = xmlDoc.getElementsByTagName("item");
		  const jsonItems = [];
		
		  const fifteenDaysAgo = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000);  // 15天前的日期
		
		  for (let i = 0; i < items.length; i++) {
		    const title = items[i].getElementsByTagName("title")[0].textContent.replace(/<em>|<\/em>/g, '');
		    const description = items[i].getElementsByTagName("description")[0].textContent.replace(/<em>|<\/em>/g, '');
		    const pubDate = items[i].getElementsByTagName("pubDate")[0].textContent;
		    let link = items[i].getElementsByTagName("link")[0].textContent;
		
		    // 如果RSS源URL包含"/search/newsflashes/"，则使用源URL作为原文链接
		    if (rssUrl.includes("/search/newsflashes/")) {
		      link = `http://www.36kr.com/search/newsflashes/${encodeURIComponent(title)}`;
		    }
		
		    let date = new Date(pubDate);
		
		    // 如果新闻的发布日期在15天前，或者新闻标题不包含任何关键词，那么跳过这个新闻
		    if (date < fifteenDaysAgo || !keywords.some(keyword => title.includes(keyword))) continue;
		
		    let formattedTime = formatTime(date);
		    let formattedDate = formatDate(date) + ' ' + formattedTime;
		
		    const jsonItem = {
		      "term": title,
		      "content": description,
		      "definition": formattedDate,
		      "link": link
		    };
		
		    jsonItems.push(jsonItem);
		  }
		
		  return jsonItems;
		}




		
		// 收集RSS数据并排序
		async function getAndSortRssData(rssUrl) {
		    let data = await getRssData(rssUrl);
		    
		    // 按日期排序
		    data.sort((a, b) => new Date(b.definition) - new Date(a.definition));
		  
		    return data;
		}
		
		
				const content = document.getElementById("announcement-containers");
				
				function renderGlossary(glossaryNews) {
				  content.innerHTML = "";
				  let previousDate = "";
				
				  glossaryNews.forEach(item => {
				    const currentDate = item.definition.split(" ")[0];
				
				    // 检查 currentDate 是否是一个有效的日期
				    if (isNaN(Date.parse(currentDate))) {
				      return;  // 如果 currentDate 不是一个有效的日期，跳过这个 item
				    }
				
				    const [year, month, day] = currentDate.split("-");
				
				    if (currentDate !== previousDate) {
				      const dateDiv = document.createElement("div");
				      dateDiv.className = "date-label";
				      dateDiv.textContent = `📅 ${month}月${day}日`;
				      content.appendChild(dateDiv);
				      previousDate = currentDate;
				    }
				
				        const div = document.createElement("div");
				        div.className = "term";
				        
				        const time = item.definition.split(" ")[1];
				        const p = document.createElement("p");
				        p.innerText = time;
				
				        const h3 = document.createElement("h3");
				        h3.innerText = item.term;
				
				        // 如果卡片重要，将 term 文字设置为红色
				        if (item.important) {
				            h3.style.color = "red";
				        }
				
				        const contentPara = document.createElement("p");
				        contentPara.innerText = item.content;
				        contentPara.className = "content-para";
				
				        div.appendChild(p);
				        div.appendChild(h3);
				        div.appendChild(contentPara);
				        
				        if (item.link) {
				            const a = document.createElement("a");
				            a.href = item.link;
				            a.textContent = "🔗 原文链接";
				            a.className = "learn-more";
				            a.target = "_blank";
				            div.appendChild(a);
				            div.addEventListener('click', function () {
				                window.open(item.link);
				            });
				        }
				
				        content.appendChild(div);
				    });
				}
		
		
		
		
		
		
				
				function filterGlossary(query) {
				    return glossaryNews.filter(item => {
				        return item.term.toLowerCase().includes(query.toLowerCase()) || item.definition.toLowerCase().includes(query.toLowerCase()) || item.content.toLowerCase().includes(query.toLowerCase());
				    });
				}
		
				
				
				const searchInput = document.getElementById('search-input');
				searchInput.addEventListener('input', updateGlossary);
				
				function updateGlossary() {
				  const query = searchInput.value;
				
				  const filteredGlossary = filterGlossary(query);
				  renderGlossary(filteredGlossary);
				}
				
				
				Promise.all([
				  getRssData('http://rsshub.app/36kr/search/newsflashes/AI'),
				  getRssData('http://rsshub.app/36kr/search/newsflashes/GPT')
				]).then(([data1, data2]) => {
				  data1.forEach(item => {
				    glossaryNews.push(item);
				  });
				
				  data2.forEach(item => {
				    glossaryNews.push(item);
				  });
				
				  // 进行排序
				  glossaryNews.sort((a, b) => new Date(b.definition) - new Date(a.definition));
				  
				  // 数据加载完成后隐藏加载动画
				    loadingElement.style.display = "none";
				
				  updateGlossary();  // 更新页面
				});

		