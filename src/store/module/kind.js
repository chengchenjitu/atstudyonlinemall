// import qs from 'qs'
import axios from 'axios'
export default {
	namespaced : true,
	state : {
		number : 0,			//商品类型判度
		category : [],
		cate_id : '',		//三级分类id
		name_push : [],		
		pid : 0,
		spu : [],			//商品分类id
		spu1 : [],			//首页商品id
		length : 10,		//筛选页面展示商品长度
		length1 : 5,		//存放首页展示商品长度
		search : '',		//搜索框双绑数据
		pid_list : '',
		lista : '',
		tips : false,
		tap : false,
		break : false,
		
		//单个商品详情数据
		spu_id : undefined,		//商品详情id
		spu_detail : undefined,	//商品详情数据
		spu_img : undefined,	//展示图片
		spu_name : undefined,	//商品名称
		active : undefined,		//激活商品图片地址
		lengths : 0,			//缩略图张数
		price : 0,				//商品价格
		originalprice : 0,		//原价
		quantity : 0,			//库存
		color : undefined,		//颜色及图片，版本，购买方式
		active1 : undefined,	//颜色激活id
		active2 : undefined,	//版本激活id
		active3 : undefined,	//购买方式激活id
		actived : [],			//总数组
		
	},
	actions : {
		// 单个商品详情
		//获取单个商品详情请求
		detail(context){
			axios.get( `/api/spu/${context.state.spu_id}`)
			.then(response => {
				//初始名称
				context.state.spu_name=response.data.data.skuList[0].sku_name
				//展示图片
				context.state.spu_img=response.data.data.attrKeyList[0].attrValueList[0]
				//商品详细数据
				context.state.spu_detail=response.data.data
				//获取缩略图张数
				context.state.lenghts=response.data.data.attrKeyList[0].attrValueList[0].value_images.length
				//默认选中第一张图
				context.state.active=response.data.data.attrKeyList[0].attrValueList[0].value_images[0]
				//初始价格
				context.state.price=response.data.data.skuList[0].sku_price
				//原价
				context.state.originalprice=response.data.data.skuList[0].sku_originalprice
				//库存
				context.state.quantity=response.data.data.skuList[0].sku_quantity
				//颜色及图片及版本，购买方式
				context.state.color=response.data.data.attrKeyList
				//获取初始颜色激活id
				if(response.data.data.attrKeyList[0] != undefined){
					context.state.active1=response.data.data.attrKeyList[0].attrValueList[0].value_id
				}
				//版本id
				if(response.data.data.attrKeyList[1] != undefined){
					context.state.active2=response.data.data.attrKeyList[1].attrValueList[0].value_id
				}
				//购买方式id
				if(response.data.data.attrKeyList[2] != undefined){
					context.state.active3=response.data.data.attrKeyList[2].attrValueList[0].value_id
				}
				context.state.actived[0] = context.state.active1
				context.state.actived[1] = context.state.active2
				context.state.actived[2] = context.state.active3
			})
		},
		
		
		
		// 前两个页面使用的请求
		kind_list(){
			return axios.get( "/api/category" , { params : { category : "" } } )
			.then(response => {
				return response
			})
		},
		category_list(context){
			axios.get( "/api/attr" , { params : { 
				cate_id : `${context.state.cate_id}`,
				key_issku : "0",
				key_ishigh : "0"
				} } )
			.then(response => {
				context.state.category = response.data
			})
		},
		pid(context){
			axios.get( "/api/category" , { params : {
				pid : `${context.state.pid}`,
				} } )
			.then(response => {
				context.state.pid_list = response.data.data
			})
		},
		spu(context){
			axios.get( "/api/spu" , { params : {
				spu_name : `${context.state.search}`,
				spu_title : '',
				spu_status : '',
				cate_id : `${context.state.cate_id}`,
				valueList : `${context.state.lista}`,
				start : '0',
				length : `${context.state.length}`
				} } )
			.then(response => {
				context.state.spu = response.data.data
				if(context.state.break){
					context.state.pid_list = response.data.categoryList
				}
			})
		},
		spu1(context){
			let aaa = [26,130,219,34]
			for(let i = 0; i<= 3; i++){
				axios.get( "/api/spu" , { params : {
					cate_id : `${aaa[i]}`,
					start : '0',
					length : `${context.state.length1}`
					} } )
				.then(response => {
					context.state.spu1[i] = response.data.data
				})
			}
		},
	},
	mutations : {
		windows(context){
			context.length += 10
			this.dispatch('kind/spu')
		}
	},
}