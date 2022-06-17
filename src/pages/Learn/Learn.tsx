/* eslint-disable no-underscore-dangle */
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { ReactComponent as Loader } from '../../assets/loaders/loader.svg';

import s from './Learn.module.css';

import { SuperButton, SuperRadio } from 'components';
import { MAX_CARDS_COUNT, ONE, TWO } from 'constant';
import {
  fetchCards,
  setCardToLearn,
  updateCardGrade,
} from 'pages/PacksList/CardsList/CardsListReducer';
import { AppRoutePaths } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

export const Learn: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const cardPacks = useAppSelector(state => state.packs.packs.cardPacks);
  const packName = cardPacks
    ? cardPacks.find(pack => pack._id === id)?.name
    : 'Cant find pack name';
  const cardToLearn = useAppSelector(state => state.cards.cardToLearn);

  const [isAnswerOpened, setIsAnswerOpened] = useState<boolean>(false);
  const [grade, setGrade] = useState<number>(ONE);

  useEffect(() => {
    dispatch(fetchCards({ cardsPack_id: id, page: ONE, max: MAX_CARDS_COUNT })).then(
      isRes => isRes && dispatch(setCardToLearn()),
    );
  }, [id]);

  enum RadioOptions {
    'Did not know' = 1,
    'Forgot',
    'A lot of thought',
    'Confused',
    'Knew the answer',
  }
  const keysAndValues = Object.keys(RadioOptions);
  const RadioOptionsKeys = keysAndValues.slice(keysAndValues.length / TWO);

  const onCancelClick = (): void => {
    if (isAnswerOpened) {
      dispatch(setCardToLearn());
      return setIsAnswerOpened(false);
    }
    return navigate(AppRoutePaths.PACKS_LIST);
  };

  const onOpenAnswerClick = (): void => {
    setIsAnswerOpened(true);
  };
  const onNextAnswerClick = (): void => {
    dispatch(updateCardGrade({ card_id: cardToLearn!._id, grade }));
    setIsAnswerOpened(false);
    dispatch(setCardToLearn());
  };

  const onRadioChangeHandle = (e: ChangeEvent<HTMLInputElement>): void => {
    setGrade(RadioOptions[e.currentTarget.value as keyof typeof RadioOptions]);
  };

  if (!cardToLearn) return <Loader />;
  return (
    <div className={s.learnWrapper}>
      <h2>{`Learn ${packName || 'some pack'}`}</h2>

      <div className={s.ratingWrapper}>
        <Rating
          ratingValue={0}
          initialValue={cardToLearn.grade}
          readonly
          iconsCount={5}
          size={17}
          fillColor="#21268F"
          emptyColor="#D7D8EF"
        />
      </div>
      <p>
        <b>Question: </b>
        <SyntaxHighlighter language="javascript" style={docco} wrapLongLines>
          {cardToLearn?.question}
        </SyntaxHighlighter>
      </p>
      {isAnswerOpened && (
        <>
          <p>
            <b>Answer: </b>
            <SyntaxHighlighter language="javascript" style={docco} wrapLongLines>
              {cardToLearn?.answer}
            </SyntaxHighlighter>
          </p>
          <div className={s.rateWrapper}>
            <p>
              <b>Rate yourself:</b>
            </p>
            <div className={s.radioWrapper}>
              <SuperRadio
                options={RadioOptionsKeys}
                onChange={onRadioChangeHandle}
                value={RadioOptions[grade]}
              />
            </div>
          </div>
        </>
      )}
      <div className={s.buttonWrapper}>
        <SuperButton size="small" color="secondary" onClick={onCancelClick}>
          Cancel
        </SuperButton>
        <SuperButton
          size="medium"
          onClick={isAnswerOpened ? onNextAnswerClick : onOpenAnswerClick}
        >
          {isAnswerOpened ? 'Next' : 'Show Answer'}
        </SuperButton>
      </div>
    </div>
  );
};
