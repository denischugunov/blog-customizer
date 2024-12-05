import clsx from 'clsx';
import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from './components/article-params-form';
import { Article } from './components/article';
import { defaultArticleState } from './constants/articleProps';
import styles from './styles/index.module.scss';

const App = () => {
	const [articleStyles, setArticleStyles] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleStyles={setArticleStyles} />
			<Article />
		</main>
	);
};

export default App;
