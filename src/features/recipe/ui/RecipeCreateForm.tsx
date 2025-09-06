import React, { useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import RecipeCreateHeader from './RecipeCreateHeader';
import FormTitle from './FormTitle';
import FormMediaUpload from './FormMediaUpload';
import FormTextInput from './FormTextInput';
import FormLongTextInput from './FormLongTextInput';
import FormCatagoryArcodian from './FormCatagoryArcodian';
import FormAddRecipeOrder from './FormAddRecipeOrder';
import FormRecipeVisibilityToggle from './FormRecipeVisibilityToggle';

const RecipeCreateForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState<'public' | 'private'>('public');

  const categories = [
    '밑반찬1',
    '메인반찬',
    '국/탕',
    '찌개',
    '디저트',
    '면/만두',
    '밥/죽/떡',
    '퓨전',
    '김치/젓갈/장류',
    '양념/소스/잼',
    '양식',
    '샐러드',
    '스프',
    '빵',
    '과자',
    '차/음료/술',
    '기타',
  ];

  return (
    <View className="flex-1">
      <RecipeCreateHeader hasShadow={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="bg-white"
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
      >
        <ScrollView
          className="flex-1 bg-white px-[16px] pt-[16px]"
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <FormTitle title="레시피 기본 정보" />

          <FormMediaUpload uploadType="image" />

          <FormTitle title="레시피 제목" />
          <FormTextInput
            placeholder="예) 소고기 미역국"
            value={inputValue} // fixme
            onChangeText={setInputValue} // fixme
          />

          <FormTitle title="레시피 소제목" />
          <FormTextInput
            placeholder="예) 할머니의 손맛 "
            value={inputValue} // fixme
            onChangeText={setInputValue} // fixme
          />

          <FormTitle title="레시피 소개" />
          <FormLongTextInput
            placeholder="예) 제 생일이면 늘 할머니가 끓여주신 추억의 레시피입니다."
            value={inputValue}
            onChangeText={setInputValue}
          />

          <FormTitle title="카테고리" />
          <FormCatagoryArcodian title={'내 카테고리'} categories={categories} />
          <FormCatagoryArcodian title={'종류'} categories={categories} />
          <FormCatagoryArcodian title={'상황'} categories={categories} />
          <FormCatagoryArcodian title={'재료'} categories={categories} />
          <FormCatagoryArcodian title={'방법'} categories={categories} />

          <FormTitle title="레시피 정보" />
          <FormCatagoryArcodian title={'인원'} categories={categories} />
          <FormCatagoryArcodian title={'요리시간'} categories={categories} />
          <FormCatagoryArcodian title={'난이도'} categories={categories} />

          <FormTitle title="재료 정보" />
          <FormLongTextInput
            placeholder="예) 다진 소고기 50g, 양파 1개, 대파 1대, 고춧가루 2T,
간장 2T, 후추 "
            value={inputValue}
            onChangeText={setInputValue}
          />

          <FormTitle title="레시피 영상(선택)" />
          <FormMediaUpload uploadType="video" />

          <FormTitle title="레시피 순서" />
          <Text>요리의 맛이 좌우될 수 있는 중요한 부분은 빠짐 없이 적어주세요.</Text>

          {/* Step 1 */}
          <FormMediaUpload uploadType="image" />
          <FormLongTextInput
            placeholder="예) 그 사이에 양파와 버섯, 대파도 썰어서 준비해 주세요."
            value={inputValue}
            onChangeText={setInputValue}
          />
          {/* Step 2 */}
          <FormMediaUpload uploadType="image" />
          <FormLongTextInput
            placeholder="예) 그 사이에 양파와 버섯, 대파도 썰어서 준비해 주세요."
            value={inputValue}
            onChangeText={setInputValue}
          />
          <FormAddRecipeOrder />

          {/* 레시피 Kick */}
          <FormTitle title="레시피 Kick" />
          <FormLongTextInput
            placeholder="예) 치킨스톡을 살짝 넣으면 더 맛있습니다."
            value={inputValue}
            onChangeText={setInputValue}
          />

          <FormTitle title="레시피 공개여부" />

          <FormRecipeVisibilityToggle selectedToggle={selected} setSelectedToggle={setSelected} />
          <TouchableOpacity className="my-[12px] h-[48px] items-center justify-center rounded-xl bg-[#F5F2F0]">
            <View>
              <Text className="text-[16px] font-bold">임시저장</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="mb-[12px] h-[48px] items-center justify-center rounded-xl bg-[#E37036]">
            <View>
              <Text className="text-[16px] font-bold text-white">저장하기</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RecipeCreateForm;
