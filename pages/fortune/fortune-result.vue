<template>
	<FtBackground>
		<FtScroll>
			<view style="font-size: 30rpx; line-height: 48rpx">
				<view>您的姓名：红辣椒</view>
				<view>您的性别：男</view>
				<view>出生日期：{{ Date() }}</view>
			</view>
		</FtScroll>
		<view style="margin: 15rpx">
			<FtLabelCard title="八字" color="#e6550e">乙亥 壬午 癸巳 乙卯</FtLabelCard>
			<FtLabelCard title="特点" color="#24933e">草泽 东方之次 辰逢壬戍癸亥即</FtLabelCard>
			<FtLabelCard title="解析" color="#1e4fde">禄分析: ('壬', '子') 正羊刃禄凶</FtLabelCard>
			<FtLabelCard title="文星贵人" color="#c2199c">癸 卯 天印贵人: 此号天印贵</FtLabelCard>
		</view>
		<FtInfoCard title="你的八字命盘解读">
			<view style="display: grid; gap: 10rpx; margin-bottom: 30rpx">
				<view style="text-align: center; font-size: 24rpx">您的八字命盘</view>
				<view style="font-size: 22rpx">甲己-中正土 乙庚-仁义金 丙辛-威制水 丁壬-淫慝木 戊癸-无</view>
				<view style="font-size: 22rpx">三会: 亥子丑: 水, 寅卯辰: 木, 巳午未: 火, 申酉戌: 金</view>
			</view>
			<FtFortuneCircle />
		</FtInfoCard>
		<FtInfoCard title="墓库">
			甲 丙 癸 壬 伤 财 -- 劫 申子辰:水 寅 巳酉丑:金 亥 寅午戌:火 申 亥卯未:木 巳 辰 寅 卯 子 官 伤 食 比 生寅申巳亥 败子午卯酉 库辰戌丑未 子丑土 寅亥木 卯戌火 酉辰金 申巳水
			未午土
			<view style="display: grid; padding: 20rpx; grid-template-columns: 1fr 1fr 1fr 1fr; place-content: center; gap: 20rpx">
				<FtCircleIcon>水</FtCircleIcon>
				<FtCircleIcon>戍</FtCircleIcon>
				<FtCircleIcon>未</FtCircleIcon>
				<FtCircleIcon>水</FtCircleIcon>
				<FtCircleIcon>水</FtCircleIcon>
				<FtCircleIcon>火土</FtCircleIcon>
				<FtCircleIcon>未</FtCircleIcon>
				<FtCircleIcon>水</FtCircleIcon>
			</view>
			<view style="font-size: 22rpx; line-height: 36rpx">
				1.调候 1辛2_丙 金不换大运 调候喜辛丙 忌庚 大运喜巳午未 忌申 (夭) 备注忌官杀混 2.金不换大运说明 丑寅午戌亥有损寿运子丑辰巳午未亥调候待改进 3.格局选用 食伤生财
				财格最佳 印格 杀印相生 官杀无用 伤官配印 月日时支没有财或偏财的禄旺 月日时支没有官的禄旺 4.桃花 : 凶居多女正官坐桃花吉 5.天乙 : 后天解难女命不适合多 6.亡神 :
				与贵人同柱没关系与劫煞对冲会三刑不佳其他情况还好为 日主所克无大碍 7.月德 : 先天有福日干终生有福忌讳冲克不怕合女命与夫星同干更佳
			</view>
		</FtInfoCard>
		<FtInfoCard title="六亲">
			<FtLabelCard title="丁" color="#e6550e">才 父亲-哀 死 病 绝</FtLabelCard>
			<FtLabelCard title="丙" color="#e6550e">财 妻子-冠 长 沐 胎</FtLabelCard>
			<FtLabelCard title="乙" color="#e6550e">食 下属-冠 帝 建 病</FtLabelCard>
			<FtLabelCard title="壬" color="#e6550e">劫 姐妹-墓 病 死 帝</FtLabelCard>
			<FtLabelCard title="己" color="#e6550e">杀 儿子-衰 死 病 绝</FtLabelCard>
			<FtLabelCard title="庚" color="#e6550e">印 母亲-养 绝 胎 死</FtLabelCard>
			<FtLabelCard title="戊" color="#e6550e">官 女儿-冠 长 沐 胎</FtLabelCard>
			<FtLabelCard title="甲" color="#e6550e">伤 孙女-衰 建 帝 沐</FtLabelCard>
			<FtLabelCard title="癸" color="#e6550e">比 兄弟-养 沐 长 建</FtLabelCard>
			<FtLabelCard title="辛" color="#e6550e">枭 祖父-墓 胎 绝 长</FtLabelCard>
			<view style="font-size: 22rpx; line-height: 36rpx">
				1.时支比子女为人公正倔强行动力强能得资产 时柱比与亲人意见不 合 比劫大于2男感情阻碍事业起伏不定 时禄伤官格晚年吉 母法总则 2.P56-26 己未 丙寅 乙丑 己卯
				3.劫财扶助无微不至劫财多者谦虚之中带有傲气凡事先理情而后情 理先细节后全局性 4.刚强精明干练女命不适合干透支藏 务实不喜欢抽象性的空谈不容
				易认错比较倔有理想但是不够灵活不怕闲言闲语干扰不顾及别人面子 5.合作事业有始无终太重细节做小领导还是可以的有志向自信杀或
				食透干可解所有负面女命忌讳比劫和合官杀多为任性引发困难之事 6.时柱劫只要不是去经济大权还好 财或偏财月重叠女职业妇女有理
				财办事能力因自己理财能力而影响婚姻一财得所红颜失配男的双妻 7.日支食神专位容易发胖有福只有2日癸卯己酉男命有有助之妻 自
				坐食神相敬相助即使透枭也无事不过心思不定做事毅力不足也可能 假客气 8.伤官有才华但是清高要生财或者印制 食神重成伤官不适合伤官配
				印金水土金木火命造更高火土要调候容易火炎土燥 9.伤官和七杀的局不适合月支为库 伤官成格基础87生财配印不考 虑调候逆用比顺用好调候更重要生正财用偏印生偏财用正印 伤官
				配印如果透杀透财不佳 10.伤官七杀同时成格不透财为上好命局 局 ['伤'] 格 ['财', '伤']
			</view>
		</FtInfoCard>
		<FtInfoText title="本报告采用纳音五行方式测算">
			纳音五行算命是中国传统命理学的一部分，特别是在八字（生辰八 字）中的应用。它是一种通过六十甲子纳音（天干地支的组合）来
			预测和分析个人命运和性格特点的方法。每一个天干地支的组合都 对应一个特定的纳音五行，而这些纳音五行则有各自的特质和影响 纳音五行的主要特点包括：
			1.纳音五行的构成：纳音五行是将一组天干地支所代表的数理通过 特定的算法纳入音律所得到的新的五行。例如，甲子和乙丑合称为 “海中金”，丙寅和丁卯合称为“炉中火”，等等。
			2.纳音与个人命运的关系：纳音五行不仅代表了命主干支的整体卦 之意象，还具有明显的数理暗示之意义。通过纳音五行，可以推测
			个人一生的格局吉凶、富贵贫贱。纳音五行中的每一个都与个人的 品性、脾气、命格层次甚至人生走向有关。 3.纳音五行的分析与运用：在八字命理中，纳音五行通常与天干地
			支的其他特点（如生克制化、五行方位等）相结合，以提供对个人 命运的全面分析。 4.纳音五行的分类：六十个甲子中的每两组甲子合成一个纳音，共
			计三十个纳音五行。这些纳音都是五行的变体，每个纳音五行都有 自己独特的强弱和属性。
		</FtInfoText>

		<FtInfoText title="读取报告须知：">
			为了给您提供高效、有针对性的服务，请注意以下问题: 1.对报告内容不明白或想深入了解，请在当前页面顶部/底部添加 老师微信; 2.如有订单问题，请及时联系客服
		</FtInfoText>
		<WechatPublicQrcode />
		<FtFooter />
	</FtBackground>
</template>

<script setup>
import FtBackground from '../../components/ft/FtBackground.vue';
import FtScroll from '../../components/ft/FtScroll.vue';
import FtLabelCard from '../../components/ft/FtLabelCard.vue';
import FtInfoCard from '../../components/ft/FtInfoCard.vue';
import FtInfoText from '../../components/ft/FtInfoText.vue';
import WechatPublicQrcode from '../../components/ft/WechatPublicQrcode.vue';
import FtCircleIcon from '../../components/ft/FtCircleIcon.vue';
import FtFortuneCircle from '../../components/ft/FtFortuneCircle.vue';
import FtFooter from '../../components/ft/FtFooter.vue';
</script>

<style scoped></style>
