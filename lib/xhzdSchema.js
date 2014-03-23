//
// 
//

var db=require('./db');
var Schema=require('mongoose').Schema;
var ObjectId = Schema.Types.ObjectId;

/*

{
    "_id" : ObjectId("532d4cc4fa0d540b4b12ba38"),
    "zi" : "国",
    "py" : "guo",
    "wubi" : "lgyi",
    "bihua" : "8",
    "pinyin" : "guó",
    "jijie" : "国\\n（國）\\nguó\\n有土地、人民、主权的政体（古代指诸侯所受封的地域）：国家。国土。国体（ａ．国家的性质；ｂ．国家的体面）。国号。国度（指国家）。国策。国情。国法。国力。国防。国威。国宝（ａ．国家的宝物；ｂ．喻对国家有特殊贡献的人）。国格。国魂。国是（国家大计，如“共商国国”）。\\n特指中国的：国产。国货。国粹。国乐（yu?）。国药。\\n姓。\\n邦\\n\\n笔画数：8；\\n部首：囗；\\n笔顺编号：25112141\\n\\n\\n",
    "xiangjie" : "国\\n囯、國\\nguó\\n【名】\\n(会意。从“囗”(wéi),表示疆域。从或(即“国”)。“或”亦兼表字音。本义:邦国)\\n周代,天子统治的是“天下”,略等于现在说的“全国”〖state〗\\n国,邦也。——《说文》\\n以佐王治邦国。——《周礼·太宰》。注:“大曰邦,小曰国。”\\n方千里曰国畿,诅祝以叙国之信用,以资邦国之剂信。——《周礼·大司马》。注:“国谓王之国;邦国,谓诸侯国也。”\\n都城过百雉,国之害也。——《左传·隐公元年》\\n丘也闻有国有邦者。——《论语·微子》\\n夫大国,难测也,惧有伏焉。——《左传·庄公十年》\\n秦人开关延敌,九国之师,逡巡而不敢进。——汉·贾谊《新书·过秦论上》\\n又如:齐国;晋国;郑国\\n国都,一国最高政权机关所在地。又称国城,国邑〖capital〗\\n国中九经九纬。——《考工记·匠人》。注:“城内也。”\\n三曰国禁。——《周礼·士师》。注:“城中也。”\\n在国曰市井之臣。——《孟子》。注:“谓都邑也。”\\n土国地漕。——《诗·邶风·击鼓》\\n先王之制,大都不过参国之一,中五之一,小九之一。——《左传·隐公元年》\\n武夫力而拘诸原,妇人暂而免诸国。——《左传·僖公三十三年》\\n愿君顾先王之宗庙,姑反国统万人乎!——《战国策·齐策》\\n登斯楼也,则有去国怀乡,忧馋畏讥,满目萧然,感极而悲者矣。——范仲淹《岳阳楼记》\\n又如:国中(王城之内;国内);国人(国都中的人);国迁(国都迁徙);国阴(都城北郊);国郊(国都周围地名);国禁(古代国都中的禁令);国邑(城邑);国刑(城中施行的刑罚)\\n国家〖country;state;nation〗\\n聊以行国。——《诗·魏风·园有桃》\\n国无有残。——《诗·大雅·民劳》\\n僵卧孤村不自哀,尚思为国戍轮台。——宋·陆游《十一月四日风雨大作》\\n思国之安者,必积其德义。——唐·魏征《谏太宗十思疏》\\n国人皆以诸先烈之牺牲精神为国奋斗。——孙文《黄花冈七十二烈士事序》\\n又如:国纪(旧指国家礼制与法令);国帑(国库中的钱币);国禄(国家的俸禄);国课(国税;国家税收);国器(可主持国政的人才)\\n古代王、侯的封地〖feud〗\\n汉王之国,良送至褒中。——《史记·留侯之家》\\n孟尝君就国于薛。——《战国策·齐策》\\n又如:国租(封地的田赋)\\n帝王〖emperor's〗。如:国孝(为皇帝、后妃或皇帝父母服丧);国丈(帝王的岳父);国太(帝王之母的俗称);国姻(帝王的姻亲)\\n部落〖tribe〗\\n〖韩〗凡七十八国。伯济是其一国焉。大者万余户,小者数千家,各在山海间。——《后汉书》\\n地方〖place〗\\n荆州北据汉沔,利尽南海,东连吴会,西通巴蜀,此用武之国。——晋·陈寿《三国志·诸葛亮传》\\n逝将去女,适彼乐国。——《诗·魏风·硕鼠》\\n家乡〖hometown〗\\n〖侃〗欲逊位归国,佐吏等苦留之。——《晋书》\\n姓\\n\\n国宝\\nguóbǎo\\n〖nationaltreasure;treasureofthecountry;natioualheirloom〗∶国家的宝物\\n大熊猫是我国的国宝\\n〖specialcontributortothecountry;besttalentsofanation〗∶对国家有特殊贡献的人的赞誉\\n成就卓著的老科学家被国人誉为国宝\\n国宾\\nguóbīn\\n〖stateguest〗\\n一国的老臣。或指来朝的诸侯、来聘的卿大夫\\n筵国宾于牖前。——《周礼·春官·司几筵》\\n新王朝对旧王朝后代的尊称\\n昔武王克商,封夏后氏之后于杞,封殷氏之后宋,若今周后介公。——《唐律疏议·名例》\\n接受本国政府邀请前来访问的外国元首或政府首脑\\n国柄\\nguóbǐng\\n〖thepoliticalpowerofanation〗国家大权\\n大臣太贵,所谓贵者,无法而擅行,操柄而便私者也。——《韩非子·人主》\\n国步\\nguóbù\\n〖nationalfate〗∶国运\\n国步艰难\\n〖territory〗∶国土\\n国步连营五千里\\n国步艰难\\nguóbù-jiānnán\\n〖thenationisbeingfacedbydifficulties〗指内忧外患频起,国家的前途和命运面临严峻的考验\\n时国步艰难,连帅倔强,率多奏请,欲立家庙于本镇,倾上章论奏,乃止。——《旧五代史·唐书·萧倾传》\\n国策\\nguócè\\n〖thebasicpolicyofastate;nationalpolicy〗国家执行较长时间,对国计民生有重大影响的基本政策\\n全国各族人民的代表在这里共商国策。——《雄伟的人民大会堂》\\n国产\\nguóchǎn\\n〖home-made〗∶在特定的国家或地区内生产的\\n用来制作国产羊乳干酪的地窖\\n〖madeinourcountry;madeinChina〗∶我国生产的\\n国产汽车\\n国产影片\\n国耻\\nguóchǐ\\n〖nationalhumiliation〗因外国的侵略及国内的软弱或腐败而使国家蒙受的耻辱\\n丧权辱国的“二十一条”是中国的国耻\\n不忘国耻\\n清雪国耻\\n国粹\\nguócuì\\n〖thequintessenceofChineseculture;nationallegacy〗中国传统文化中的精华\\n国典\\nguódiǎn\\n〖nationaldecreesandregulations〗国家的典章制度\\n国都\\nguódū\\n〖nationalcapital;capital〗首都\\n国度\\nguódù\\n〖state〗指国家\\n我们以生活在这个英雄的国度而自豪!——《谁是最可爱的人》\\n国法\\nguófǎ\\n〖nationallaw;lawoftheland〗国家的法律规定\\n伤天害理,国法难容\\n国防\\nguófáng\\n〖nationaldefence〗古人视礼义为维护社会国家的安全力量,必须严格遵行,防止逾越,称为国防。今日指为保卫国家的主权、领土完整和安全,防御外来的武装侵略和颠覆所采取的一切措施\\n臣愚以为宜隐郊祀之事,以崇国防。——《后汉书·孔融传》\\n加强国防建设\\n国歌\\nguógē\\n〖nationalanthem〗法定在正式场合代表国家的歌曲\\n国格\\nguógé\\n〖nationalcharacterandmorals;nationhood〗作为一个国民应该具备的爱护国家、维护国家尊严的品格\\n极个别的人甚至不顾国格、人格,干了一些不知羞耻的丑事\\n国故\\nguógù\\n〖thenationalcultural,esp.literaryheritage〗∶本国固有的学术与文化(多指语言文字、文学、历史等)\\n整理国故\\n〖disaster〗∶国家所遭受的凶、丧、战争等重大变故\\n另后不意遽闻国故,哀号追慕迨今未已。——宋·苏轼《与滕达道书》\\n国号\\nguóhào\\n〖thetitleofareigningdynasty〗一国的称号,如汉、唐、宋、元、明、清等\\n国花\\nguóhuā\\n〖thenationalflower〗代表国家的花。——可以作为国家的象征及显示民族精神\\n樱花是日本的国花\\n国画\\nguóhuà\\n〖traditionalChinesepainting〗中国传统的绘画\\n国徽\\nguóhuī\\n〖nationalemblem;insigniaofacountry〗由一个国家的宪法或专门法律规定的代表国家的标志。中国的国徽,中间是五星照耀下的天安门,周围是谷穗和齿轮\\n国会\\nguóhuì\\n〖Congress;nationalassembly〗全国性的议会\\n第七十一届国会\\n国魂\\nguóhún\\n〖nationalspirit〗指一个国家特有的民族精神\\n鲁迅精神是我国的国魂\\n国货\\nguóhuò\\n〖domestic〗∶本国出产或制造的物品\\n国货精品商场\\n〖China-madegoods;Chinesegoods〗∶旧时指我国自己制造的工业品\\n国籍\\nguójí\\n〖nationality;citizenship〗\\n指个人具有的属于某个国家的身分\\n双重国籍\\n指飞机船只等属于某个国家的事实或状态\\n国技\\nguójì\\n〖thenationalfeat〗足以代表一个国家传统文化的特殊技术,如中国的武术、中医、烹调等\\n国际\\nguójì\\n〖international〗在各国及其公民之间或中间;关于各国的交往;由两个或更多国家参加;两个或更多国家共有或影响两个或更多国家\\n国际交往\\n国际地位\\n国际关系\\n国际法\\n国际音标\\n国际标准\\n国际博览会\\n国际歌\\nGuójìgē\\n〖theInternationale〗国际无产阶级革命歌曲。法国欧仁·鲍狄埃(EugènePottier)作词,狄盖特(PierreDegeyter)配曲\\n国计民生\\nguójì-mínshēng\\n〖nationaleconomyandlivelihoodofthepeople〗国家经济和人民生活\\n粮食是关系国计民生的重要物资\\n声色犬马,昼夜荒淫,国计民生,罔存念虑。——《聊斋志异·谈黄粟》\\n国家\\nguójiā\\n〖state〗∶长期占有一块固定领土,政治上结合在一个主权政府之下的人民的实体;一种特定形式的政府、政体或政治上组织起来的社会\\n世俗国家\\n福利国家\\n法西斯国家\\n在中国,铁路属于国家\\n国家机器\\n国家监狱\\n国家银行\\n国家所有制\\n国家社会主义\\n国家资本主义\\n国家大事\\n国家机密\\n我们的权利受国家保护\\n国家之首\\n国家安全\\n〖nation〗∶由一个民族或多个民族组成并且具有或多或少确定的领土和一个政府的人民的共同体\\n中国是有成文宪法的国家\\n西方国家\\n新近独立的国家\\n国家的形势\\n这是个英雄的国家\\n〖country;land〗∶由人民共同体所占据的土地\\n亚洲国家\\n殖民地国家\\n这个国家有几条大河\\n在这个国家的各个角落\\n第三世界国家\\n他曾在许多国家居住过\\n美丽的国家\\n国交\\nguójiāo\\n〖diplomaticrelationsbetweencountries〗国与国间的交往。即今之外交\\n国脚\\nguójiǎo\\n〖footballplayersofanationalteam〗指国家队的足球运动员\\n国界\\nguójiè\\n〖nationalboundaries〗国与国领土之间的分界线。中国古代也指地方团体的境界\\n国境\\nguójìng\\n〖frontier;nationalboundarylimits〗∶一个国家的邻接或面对另一国家的那一部分;国界。如:国境线\\n〖landofacountry〗∶国土,疆域\\n国境辽阔\\n国舅\\nguójiù\\n〖brothersofempressdowagerandempress〗指封建王朝中太后或皇后的弟兄,即皇帝的母舅或妻舅\\n韦澳为京兆尹,豪右敛手。国舅郑光庄不纳租,澳絷其主者。——唐·裴庭裕《东观奏记》\\n国君\\nguójūn\\n〖monarch〗封建制或君主制国家的统治者,通常实行终身制和世袭继承制\\n国库\\nguókù\\n〖treasury;nationalpurse;exchequer〗国家的金库。旧指国家储存财物的总机关\\n国力\\nguólì\\n〖nationalpower(orstrength,might)〗一个国家的政治、经济、军事、科技、文教卫生等发展水平的总和\\n国立\\nguólì\\n〖state-maintained;state-run〗国家设立\\n国立大学\\n国门\\nguómén\\n〖gateofthecapitalcity〗\\n旧指国都的城门,也指守护城门的小神,也指边境;今指边防哨所和海关\\n拒敌于国门之外\\n比喻国家政策、规定\\n打开国门,大胆吸收一切有用的东西\\n国民\\nguómín\\n〖national;citizen〗\\n全国民众\\n今指取得一国国籍的人,即该国国民\\n国民经济\\nguómínjīngjì\\n〖nationaleconomy〗一个国家的生产、流通、分配和消费的总体,包括各个生产部门和为生产服务的流通部门,如工业、农业、建筑业、交通运输业、商业、物资供应等,也包括文化、教育、科学研究、医药卫生等非生产部门\\n国民收入\\nguómínshōurù\\n〖nationalincome〗一个国家国民经济各个生产部门在一个时期内新创造的价值的总和。就是从一个时期内的社会总产品的价值中,减去生产上消耗掉的生产资料的价值后剩余的部分\\n国民政府\\nguómínzhèngfǔ\\n〖nationalgovernment〗国民党执政的政府。它经历了大元帅府,广州革命政府,南京政府的变迁\\n国难\\nguónàn\\n〖nationalcalamity(causedbyforeignaggression);troublesinournativeland〗国家的患难、灾难,特指由外国侵略造成的国家灾难\\n捐躯赴国难,视死忽如归\\n国难当头\\n国内\\nguónèi\\n〖domestic;home;internal〗在特定的国家的内部\\n国戚\\nguóqī\\n〖king'srelatives〗天子的亲戚。多指后妃的本家\\n皇亲国戚\\n国旗\\nguóqí\\n〖nationalflag〗由国家正式规定的代表本国的旗帜。其式样、图案和使用办法由宪法或专门法律规定。中国的国旗是五星红旗\\n国情\\nguóqíng\\n〖thecondition(orstate)ofacountry;nationalconditions〗一个国家的社会性质、政治、经济、文化等方面的基本情况和特点\\n现在制定的一系列政策是适合我国国情的\\n国庆\\nguóqìng\\n〖NationalDay〗开国纪念日\\n国丧\\nguósāng\\n〖statefuneral〗旧指皇帝、皇后、太上皇、太后的丧事,在一定的时间内禁止宴乐婚嫁,以示哀掉\\n国色\\nguósè\\n〖nationalbeauty〗∶有绝顶出众的美貌、冠绝一国的女子\\n天姿国色\\n骊姬者,国色也。——《公羊传·僖公十年》\\n〖peony〗∶牡丹,色极艳丽,有国色之称\\n惟有牡丹真国色,花开时节动京城。——唐·刘禹锡《尝牡丹》\\n国色天香\\nguósè-tiānxiāng\\n〖nationalbeautyandheavenlyfragrance〗为牡丹的别称。极言牡丹香色的可贵。现多比喻出色的佳人\\n(十娘)粉容微露,却被孙富窥见了,果是国色天香。——《警世通言》三十二\\n国殇\\nguóshāng\\n〖nationalmartyr〗死于国事,为国牺牲的人\\n投躯报明主,身死为国殇。——南朝宋·鲍昭《代出自蓟北门行》诗\\n国士无双\\nguóshì-wúshuāng\\n〖astatescholarofnoequal〗国士,国内最有才干的人。国中找不到第二个的奇才。泛指当代杰出的人才\\n诸将易得耳,至如信者,国事无双。——《史记·淮阴侯列传》\\n国势\\nguóshì\\n〖nationalpower;nationalsituationatagivenmoment〗一个国家发展的总态势;国力\\n国势衰微\\n国事\\nguóshì\\n〖national(orstate)affairs〗国家重要的事务。尤指与政治有关的事\\n国事至此,予不得爱身。——宋·文天祥《指南录后序》\\n国是\\nguóshì\\n〖importantaffairsofstate〗国家的重大政策\\n愿相国与诸大夫关定国是也。——《后汉书·桓谭传》\\n共商国是\\n今年四月,定国是之诏既下。——清·梁启超《谭嗣同传》\\n国手\\nguóshǒu\\n〖nationalchampion(inchess,etc.);grandmaster〗才艺技能冠(如棋艺、医道等)绝全国的人\\n人心无算处,国手有输时。——《唐诗纪事·裴说·棋》\\n国泰民安\\nguótài-mín’ān\\n〖makethestateprosperousandpeoplepeaceful〗国家康泰安宁,人民安居乐业。形容太平盛世\\n每岁海潮太溢,冲激州城,春秋醮祭,治命学士院,撰青词以祈国泰民安。——宋·吴自牧《山川神》\\n国体\\nguótǐ\\n〖minister〗∶大臣辅佐国君,就像人体有股肱一样,故称大臣为国体\\n〖statesystem;formofthegovernment〗\\n国家的典章制度\\n国家的形式。大致可分为君主国与共和国。表明国家根本性质的国家体制,是由社会各阶级在国家中的地位来决定的\\n国土\\nguótǔ\\n〖territory;landofacountry〗国家的领土\\n国王\\nguówáng\\n〖king〗一国之长。古代称诸侯封地为国,一国之长称王。自汉以后,则以国王为最高封爵。宋、元又作为封号,清则改称亲王。现代某些君主制国家元首的一种名称\\n国威\\nguówēi\\n〖nationalpowerandinfluence;nationalprestige〗国家的名望声威。也指军力而言\\n大振国威\\n国文\\nguówén\\n〖Chineseasanationallanguage〗∶本国的语言\\n〖nationalculturalrelics〗∶一国的文物\\n〖nationallanguageandliterature〗∶本国的语言文学\\n国务\\nguówù\\n〖nationalaffairs〗国家的事务;国事\\n国务不可不谨也。——《高君书·壹言》\\n国务活动\\n国务卿\\nguówùqīng\\n〖secretaryofstate〗主管外交事务的政府内阁成员,美利坚合众国的国务卿为国务院的领导人\\n国务院\\nguówùyuàn\\n〖theStateCouncil〗∶中国最高国家权力机关的执行机关,即最高国家行政机关,由总理、副总理、国务委员等若干人、各部部长、各委员会主任等人员组成\\n〖theStateDepartment〗∶美国政府中主管外交兼管部分内政的部门,主管者称国务卿\\n国宴\\nguóyàn\\n〖statebanquet〗国家元首或政府首脑,为招待国宾、贵宾或在重要节日而举行的正式而隆重的宴会\\n国音\\nguóyīn\\n〖thepronunciationadoptedbythegovernmentandusedbythepeopleatlarge〗全国共同遵用的标准音。旧指国家审定的汉语标准音\\n国营\\nguóyíng\\n〖national;state-operated;state-run〗国家的,属于国家政府的,由国家政府经管或提倡的\\n一条国营柏油路\\n国有\\nguóyǒu\\n〖state-owned〗为国家政府所拥有\\n国有化\\n土地国有\\n铁路国有\\n国有企业\\n国语\\nguóyǔ\\n〖Chinesenationallanguage〗∶中国主要方言,全国约五分之四地方使用\\n〖commonspeech〗∶中国学校和政府过去所用的官方语言,现在叫做普通话\\n〖chineseasasubjectinmiddleschoolorinprimaryschool〗∶过去指中、小学的语文课\\n国运\\nguóyùn\\n〖nationalfate;nationalfortune〗国家的命运\\n国运维艰\\n国运兴隆\\n国贼\\nguózéi\\n〖traitor〗危害国家的不良分子\\n不恤君之荣辱,不恤国之臧否,偷合苟容,以持禄养交而已耳,谓之贼。——《荀子·臣道》\\n国债\\nguózhài\\n〖nationaldebt〗国家的内外债务\\n国子监\\nguózǐjiàn\\n〖theImperialCollege,thehighesteducationaladministrationinfeudalChina〗中国封建时代最高的教育管理机构,有的朝代兼为最高学府"
}
*/
var xhzdSchema = new Schema({
  zi   :{type:String,index: true},    //字
  py   :{type:String},                //拼音            
  wubi :{type:String},                //五笔
  bihua :{type:String},               //笔划
  bushou:{type:String},               //部首
  pinyin:{type:String},               //拼音 
  jijie :{type:String},
  xiangjie:{type:String}
});

var Xhzd = db.model('xhzd',xhzdSchema);


/**
 * 查找
 * Callback:
 * 回调函数参数列表：
 * - err, 数据库错误
 * - doc, 内容
 * @param {Function} callback 
 */
exports.ZiFind=function(zi,callback){
  Xhzd.findOne({'zi':zi},function (err, doc) {
  	//debugger;
    if(!err && doc){
      return callback(false,doc);
    }
    else{
      return callback(true,null);
    }
  });
};

exports.ZiFindByid=function(id,callback){
	Xhzd.findOne({'_id':id},function (err,doc){
		if(!err && doc){
      return callback(false,doc);
    }
    else{
      return callback(true,null);
    }
	});
}