import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const [isFormOpen, setFormOpen] = useState(false);
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
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={fontFamilyOptions[0]}
						options={fontFamilyOptions}
						title='Шрифт'></Select>

					<RadioGroup
						name='Fonts'
						options={fontSizeOptions}
						selected={fontSizeOptions[0]}
						title='Размер шрифта'></RadioGroup>

					<Select
						selected={fontColors[0]}
						options={fontColors}
						title='Цвет шрифта'></Select>

					<Separator></Separator>

					<Select
						selected={backgroundColors[0]}
						options={backgroundColors}
						title='Цвет фона'></Select>

					<Select
						selected={contentWidthArr[0]}
						options={contentWidthArr}
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
