<template>
	<div class="detail">
		<el-row>
			<el-col :span="18" :offset="3">
				<infoBlock :_courseInfo="courseInfo" :_courseStar="courseStar" :_courseIntro="courseIntro"/>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<!-- 使用两列布局展示评论 -->
			<!-- 左列 -->
			<el-col :span="9" :offset="3">
				<div v-for="(comment, index) in leftReviews" :key="index">
					<reviewBlock :reviewData="comment" />
				</div>
			</el-col>
			<!-- 右列 -->
			<el-col :span="9">
				<div v-for="(comment, index) in rightReviews" :key="index">
					<reviewBlock :reviewData="comment" />
				</div>
			</el-col>
		</el-row>
		<el-backtop :right="100" :bottom="100" />
	</div>
</template>

<script setup lang="ts">
import infoBlock from './infoBlock.vue';
import reviewBlock from './reviewBlock.vue';

const reviews = ref([
	{
		username: '用户A',
		avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQaYzKh_5kYgvrN2bRBW4jvG1_NdlIlTLLsIZ-iHNV3vqQse5hZhjvZqWyxyOyHQICKU&usqp=CAU',
		datetime: '2023-11-22',
		content: '这门课程是我这学期选修的其中一门关于计算机科学的课程，名叫“数据结构与算法”。我必须说，这门课程给我留下了非常深刻的印象。一开始，我对这门课程的难度和涵盖的内容有些担心，但随着课程的进行，我发现这是我迄今为止最具挑战性但也最有价值的一门课。老师是这门课程的一大亮点。他不仅在技术上非常娴熟，而且在教学方法上也非常出色。他以生动活泼的方式讲解抽象的概念，让复杂的数据结构和算法变得更加容易理解。而且，他非常鼓励学生提问和参与讨论，让课堂氛围变得活跃和充满学术气氛。',
		rating: 4.5,
	},
	{
		username: '用户B',
		avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ENy9RwrcOJdQDpW2ZBlmrO2JqJj43WQ1pIrGrnimm8vE5OP8VyvkVX8NRnZ3MPXtz4Y&usqp=CAU',
		datetime: '2023-11-23',
		content: '烂.',
		rating: 1.2,
	},
	{
		username: '用户C',
		avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ENy9RwrcOJdQDpW2ZBlmrO2JqJj43WQ1pIrGrnimm8vE5OP8VyvkVX8NRnZ3MPXtz4Y&usqp=CAU',
		datetime: '2023-12-01',
		content: '我对这门课程的期望很高，因为我对数据结构有浓厚兴趣。课程的深度和广度都很令人满意。老师的专业知识和课程设置让我获益匪浅。',
		rating: 4.8,
	},
	{
		username: '用户D',
		avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQaYzKh_5kYgvrN2bRBW4jvG1_NdlIlTLLsIZ-iHNV3vqQse5hZhjvZqWyxyOyHQICKU&usqp=CAU',
		datetime: '2023-11-25',
		content: '这门课程内容丰富，涵盖了数据结构与算法的重要概念。老师的解释清晰，让复杂的主题变得易于理解。尤其是实践项目，让我将理论知识应用到实际中，加深了我的学习体验。',
		rating: 4.7,
	},
	{
		username: '用户E',
		avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYkmMNqDZP_0XsMEO0L9az2FKOlJgYkCj4Q&usqp=CAU',
		datetime: '2023-11-28',
		content: '对于我来说，这门课程有点挑战，但它确实提高了我的编程技能。老师的教学方式非常有效，虽然有些内容可能有些抽象，但他总能用生动的例子和比喻来解释。',
		rating: 4.3,
	},

	{
		username: '用户F',
		avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYkmMNqDZP_0XsMEO0L9az2FKOlJgYkCj4Q&usqp=CAU',
		datetime: '2023-10-13',
		content: '课程内容的设计和安排也非常周到。从基础概念到高级应用，课程内容层层递进，有条不紊地展开。每个单元的案例分析和实践项目都让我深刻领会到数据结构与算法在实际应用中的重要性。而且，课程中提供的额外资源和阅读材料也帮助我更深入地理解课堂内容。',
		rating: 4.6,
	},
	// ...
]);

/*
// 使用 ref 来存储评论数据
const reviews = ref([]);

onMounted(async () => {
  // 通过异步函数从数据库获取评论数据
  try {
	const fetchedreviews = await getreviewsFromDatabase(); // 假设该函数从数据库中获取评论信息
	reviews.value = fetchedreviews; // 将获取的评论数据赋值给 reviews
  } catch (error) {
	console.error('Error fetching reviews:', error);
  }
});
*/

// 将评论数据分为左右两列
const leftReviews = computed(() => reviews.value.slice(0, Math.ceil(reviews.value.length / 2)));
const rightReviews = computed(() => reviews.value.slice(Math.ceil(reviews.value.length / 2)));


const courseInfo = ref({
	id: '1',
	name: '数据库系统原理',
	school: '北京航空航天大学',
	teacher: ['张三', '李四'],
});

const courseStar = ref(4.7);
const courseIntro = ref('在操作系统出现之后，随着计算机应用范围的扩大、需要处理的数据迅速膨胀。最初，数据与程序一样，以简单的文件作为主要存储形式。以这种方式组织的数据在逻辑上更简单，但可扩展性差，访问这种数据的程序需要了解数据的具体组织格式。当系统数据量大或者用户访问量大时，应用程序还需要解决数据的完整性、一致性以及安全性等一系列的问题。因此，必须开发出一种系统软件，它应该能够像操作系统屏蔽了硬件访问复杂性那样，屏蔽数据访问的复杂性。由此产生了数据管理系统，即数据库。');

</script>

<style scoped>
.home {
	padding-left: 200px;
	padding-right: 200px;
}
</style>