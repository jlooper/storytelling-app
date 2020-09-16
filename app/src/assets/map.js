export default {
	title: 'Vases and the People Who Love them',
	nodes: [
		{
			text: 'ceramic vase',
			fx: -13.916222252976013,
			fy: -659.1641376795345,
			nodes: [
				{
					text: '',
					fx: 176.083777747024,
					fy: -665.1641376795345,
					nodes: [],
					category: 'reddit',
					color: 'rgba(255, 189, 10, 1.0)',
				},
				{
					text: 'source',
					note:
						'original python implementation in c, compiles python code into byte code and interprets the byte code in a evaluation loop',
					fx: 176.083777747024,
					fy: -625.1641376795345,
					nodes: [],
					category: 'github',
					color: 'rgba(36, 170, 255, 1.0)',
				},
			],
			category: 'wiki',
		},
		{
			text: 'Mrs. Vanderbilt',
			url: '',
			fx: 154.3247731601375,
			fy: -429.73700786748157,
			nodes: [
				{
					text: 'a wealthy patroness',
					fx: 291.3247731601375,
					fy: -546.2370078674815,
					nodes: [],
					category: 'github',
					color: 'rgba(175, 54, 242, 1.0)',
				},
				{
					text: 'the Vanderbilt Mansion',
					fx: 291.3247731601375,
					fy: -506.23700786748157,
					nodes: [],
					category: 'github',
					color: 'rgba(36, 170, 255, 1.0)',
				},

				{
					text: 'Gloria Vanderbilt',
					fx: 291.3247731601375,
					fy: -432.23700786748157,
					nodes: [],
					category: 'free book',
					color: 'rgba(34, 205, 224, 1.0)',
				},
				{
					text: 'Asheville NC',
					fx: 291.3247731601375,
					fy: -392.23700786748157,
					nodes: [],
					color: 'rgba(209, 21, 88, 1.0)',
				},
				{
					text: 'Chenonceaux',
					fx: 291.3247731601375,
					fy: -358.23700786748157,
					nodes: [],
					color: 'rgba(49, 187, 71, 1.0)',
				},
			],
		},
		{
			text: 'Mansions',
			url: '',
			fx: 455.7839253819375,
			fy: -183.5539283546699,
			nodes: [
				{
					text: 'Newport️',
					fx: 617.7839253819375,
					fy: -245.0539283546699,
					nodes: [],
					category: 'article',
					color: 'rgba(175, 54, 242, 1.0)',
				},
				{
					text: 'The French Connection️',
					fx: 617.7839253819375,
					fy: -183.0539283546699,
					nodes: [],
					category: 'article',
					color: 'rgba(36, 170, 255, 1.0)',
				},
				{
					text: 'Why North Carolina?',
					fx: 617.7839253819375,
					fy: -121.05392835466989,
					nodes: [],
					category: 'article',
					color: 'rgba(255, 189, 10, 1.0)',
				},
			],
		},
		{
			text: 'The Craftsman Tradition',
			note: '',
			url: '',
			fx: -98.5231997717085,
			fy: -60.07462866512333,
			nodes: [
				{
					text: 'tiles',
					fx: 83.4768002282915,
					fy: -96.57462866512333,
					nodes: [],
					color: 'rgba(255, 189, 10, 1.0)',
				},
				{
					text: 'furniture',
					fx: 83.4768002282915,
					fy: -62.57462866512333,
					nodes: [],
					category: 'free book',
					color: 'rgba(175, 54, 242, 1.0)',
				},
				{
					text: 'bungalows',
					fx: 83.4768002282915,
					fy: -22.574628665123328,
					nodes: [],
					category: 'free book',
					color: 'rgba(36, 170, 255, 1.0)',
				},
			],
		},
		{
			text: 'the aesthetic movement',
			fx: -346.2056231217888,
			fy: 39.035120728630204,
			nodes: [],
			category: 'wiki',
		},
		{
			text: 'famous craftsmen artisans️',
			fx: -78.69331502906573,
			fy: 100.14771605920942,
			nodes: [],
			category: 'mindmap',
		},
		{
			text: 'fashion trends of 1890',
			fx: -317.77054724755226,
			fy: 153.56934975958518,
			nodes: [],
		},
	],
	connections: [
		{
			source: 'ceramic vase',
			target: 'The Craftsman Tradition',
			curve: {
				x: -43.5535,
				y: 299.545,
			},
		},
		{
			source: 'Mrs. Vanderbilt',
			target: 'ceramic vase',
			curve: {
				x: -78.1206,
				y: -114.714,
			},
		},
		{
			source: 'The Craftsman Tradition',
			target: 'famous craftsmen artisans️',
			curve: {
				x: 29.6649,
				y: 80.1111,
			},
		},
		{
			source: 'The Craftsman Tradition',
			target: 'the aesthetic movement',
			curve: {
				x: -103.841,
				y: 49.5548,
			},
		},
		{
			source: 'the aesthetic movement',
			target: 'fashion trends of 1890',
			curve: {
				x: -19.7824,
				y: 57.2671,
			},
		},
		{
			source: 'Mansions',
			target: 'Mrs. Vanderbilt',
			curve: {
				x: -238.287,
				y: -54.4818,
			},
		},
	],
};
