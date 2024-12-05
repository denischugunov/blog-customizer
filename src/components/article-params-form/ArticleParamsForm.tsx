import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type Props = {
	setArticleStyles: (articleStyles: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleStyles }: Props) => {
	const [isFormOpen, setFormOpen] = useState<boolean>(false);
	const refStyles = useRef<ArticleStateType>(defaultArticleState);

	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	useEffect(() => {
		const storedStyles = localStorage.getItem('styles');
		if (storedStyles) {
			const styles = JSON.parse(storedStyles) as ArticleStateType;
			setFontFamily(styles.fontFamilyOption);
			setFontColor(styles.fontColor);
			setBackgroundColor(styles.backgroundColor);
			setContentWidth(styles.contentWidth);
			setFontSize(styles.fontSizeOption);
			setArticleStyles(styles);
		}
	}, []);

	// добавил мемоизацию, чтобы Article не рендерить, если в форме ничего не поменялось
	const articleStyles: ArticleStateType = useMemo(
		() => ({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		}),
		[fontFamily, fontColor, backgroundColor, contentWidth, fontSize]
	);

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();

		refStyles.current = articleStyles;
		// добавляю в локальное хранилище, чтобы при перезагрузке страницы стили не сбрасывались
		localStorage.setItem('styles', JSON.stringify(articleStyles));

		setArticleStyles(articleStyles);
		setFormOpen(false);
	};

	const handleFormReset = (e: FormEvent) => {
		e.preventDefault();

		localStorage.removeItem('styles');

		const {
			fontFamilyOption,
			fontColor,
			backgroundColor,
			contentWidth,
			fontSizeOption,
		} = refStyles.current;

		setFontFamily(fontFamilyOption);
		setFontColor(fontColor);
		setBackgroundColor(backgroundColor);
		setContentWidth(contentWidth);
		setFontSize(fontSizeOption);
		setArticleStyles(refStyles.current);

		// неявное поведение в задании, сделал чтобы форма закрывалась + в описании проектной работы говорится
		// что сброс до прошлых настроек, а в чек листе до дефолтных. Я сделал до прошлых.
		setFormOpen(false);
	};

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => {
					setFormOpen(!isFormOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={(selected) => setFontFamily(selected)}
						title='Шрифт'></Select>

					<RadioGroup
						name='Fonts'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={(value) => setFontSize(value)}
						title='Размер шрифта'></RadioGroup>

					<Select
						selected={fontColor}
						options={fontColors}
						onChange={(selected) => setFontColor(selected)}
						title='Цвет шрифта'></Select>

					<Separator></Separator>

					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={(selected) => setBackgroundColor(selected)}
						title='Цвет фона'></Select>

					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={(selected) => setContentWidth(selected)}
						title='Ширина контента'></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
