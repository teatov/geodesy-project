<script>
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    // import { PrismaClient } from '@prisma/client'
    // import File from '$seed/federalDistricts.csv'
    let district = 0
    let district1 = 0
    let district2 = 0
    let district3 = 0
    let district4 = 0
    let district5 = 0
    let district6 = 0
    let district7 = 0
    let district8 = 0
    let district9 = 0
</script>

<div class="flex items-stretch">
    <div class="py-4">
        <RadioItem class="flex justify-start" bind:group={district} name="district" value={1}>Центральный федеральный округ</RadioItem>
        <RadioItem class="flex justify-start" bind:group={district} name="district" value={2}>Северо-Западный федеральный округ</RadioItem>
        <RadioItem class="flex justify-start" bind:group={district} name="district" value={3}>Южный федеральный округ</RadioItem>
        <RadioItem class="flex justify-start" bind:group={district} name="district" value={4}>Приволжский федеральный округ</RadioItem>
        <RadioItem class="flex justify-start" bind:group={district} name="district" value={5}>Уральский федеральный округ</RadioItem>
        <RadioItem class="flex justify-start" bind:group={district} name="district" value={6}>Сибирский федеральный округ</RadioItem>
        <RadioItem class="flex justify-start" bind:group={district} name="district" value={7}>Дальневосточный федеральный округ</RadioItem>
        <RadioItem class="flex justify-start" bind:group={district} name="district" value={8}>Северо-Кавказский федеральный округ</RadioItem>
        <RadioItem class="flex justify-start" bind:group={district} name="district" value={9}>Прочее</RadioItem>
        <div class="py-4">
        {#if district === 1}
            <RadioItem bind:group={district1} name="district" value={31}>Белгородская область,31</RadioItem>
            <RadioItem bind:group={district1} name="district" value={32}>Брянская область,32</RadioItem>
            <RadioItem bind:group={district1} name="district" value={33}>Владимирская область,33</RadioItem>
            <RadioItem bind:group={district1} name="district" value={36}>Воронежская область,36</RadioItem>
            <RadioItem bind:group={district1} name="district" value={37}>Ивановская область,37</RadioItem>
            <RadioItem bind:group={district1} name="district" value={40}>Калужская область,40</RadioItem>
            <RadioItem bind:group={district1} name="district" value={44}>Костромская область,44</RadioItem>
            <RadioItem bind:group={district1} name="district" value={46}>Курская область,46</RadioItem>
            <RadioItem bind:group={district1} name="district" value={48}>Липецкая область,48</RadioItem>
            <RadioItem bind:group={district1} name="district" value={50}>Московская область,50</RadioItem>
            <RadioItem bind:group={district1} name="district" value={57}>Орловская область,57</RadioItem>
            <RadioItem bind:group={district1} name="district" value={62}>Рязанская область,62</RadioItem>
            <RadioItem bind:group={district1} name="district" value={67}>Смоленская область,67</RadioItem>
            <RadioItem bind:group={district1} name="district" value={68}>Тамбовская область,68</RadioItem>
            <RadioItem bind:group={district1} name="district" value={69}>Тверская область,69</RadioItem>
            <RadioItem bind:group={district1} name="district" value={71}>Тульская область,71</RadioItem>
            <RadioItem bind:group={district1} name="district" value={76}>Ярославская область,76</RadioItem>
            <RadioItem bind:group={district1} name="district" value={77}>г. Москва,77</RadioItem>
        {:else if district === 2}
            <RadioItem bind:group={district2} name="district" value={10}>Республика Карелия,10</RadioItem>
            <RadioItem bind:group={district2} name="district" value={11}>Республика Коми,11</RadioItem>
            <RadioItem bind:group={district2} name="district" value={29}>Архангельская область,29</RadioItem>
            <RadioItem bind:group={district2} name="district" value={83}>Ненецкий автономный округ,83</RadioItem>
            <RadioItem bind:group={district2} name="district" value={35}>Вологодская область,35</RadioItem>
            <RadioItem bind:group={district2} name="district" value={39}>Калининградская область,39</RadioItem>
            <RadioItem bind:group={district2} name="district" value={47}>Ленинградская область,47</RadioItem>
            <RadioItem bind:group={district2} name="district" value={51}>Мурманская область,51</RadioItem>
            <RadioItem bind:group={district2} name="district" value={53}>Новгородская область,53</RadioItem>
            <RadioItem bind:group={district2} name="district" value={60}>Псковская область,60</RadioItem>
            <RadioItem bind:group={district2} name="district" value={78}>г. Санкт-Петербург,78</RadioItem>
        {:else if district === 3}
            <RadioItem bind:group={district3} name="district" value={1}>Республика Адыгея,1</RadioItem>
            <RadioItem bind:group={district3} name="district" value={8}>Республика Калмыкия,8</RadioItem>
            <RadioItem bind:group={district3} name="district" value={23}>Краснодарский край,23</RadioItem>
            <RadioItem bind:group={district3} name="district" value={30}>Астраханская область,30</RadioItem>
            <RadioItem bind:group={district3} name="district" value={34}>Волгоградская область,34</RadioItem>
            <RadioItem bind:group={district3} name="district" value={61}>Ростовская область,61</RadioItem>
            <RadioItem bind:group={district3} name="district" value={92}>г. Севастополь,92</RadioItem>
            <RadioItem bind:group={district3} name="district" value={91}>Республика Крым,91</RadioItem>
        {:else if district === 4}
            <RadioItem bind:group={district4} name="district" value={2}>Республика Башкортостан,2</RadioItem>
            <RadioItem bind:group={district4} name="district" value={12}>Республика Марий Эл,12</RadioItem>
            <RadioItem bind:group={district4} name="district" value={13}>Республика Мордовия,13</RadioItem>
            <RadioItem bind:group={district4} name="district" value={16}>Республика Татарстан,16</RadioItem>
            <RadioItem bind:group={district4} name="district" value={18}>Удмуртская Республика,18</RadioItem>
            <RadioItem bind:group={district4} name="district" value={21}>Чувашская Республика,21</RadioItem>
            <RadioItem bind:group={district4} name="district" value={59}>Пермский край,59</RadioItem>
            <RadioItem bind:group={district4} name="district" value={43}>Кировская область,43</RadioItem>
            <RadioItem bind:group={district4} name="district" value={52}>Нижегородская область,52</RadioItem>
            <RadioItem bind:group={district4} name="district" value={56}>Оренбургская область,56</RadioItem>
            <RadioItem bind:group={district4} name="district" value={58}>Пензенская область,58</RadioItem>
            <RadioItem bind:group={district4} name="district" value={63}>Самарская область,63</RadioItem>
            <RadioItem bind:group={district4} name="district" value={64}>Саратовская область,64</RadioItem>
            <RadioItem bind:group={district4} name="district" value={73}>Ульяновская область,73</RadioItem>
        {:else if district === 5}
            <RadioItem bind:group={district5} name="district" value={45}>Курганская область,45</RadioItem>
            <RadioItem bind:group={district5} name="district" value={66}>Свердловская область,66</RadioItem>
            <RadioItem bind:group={district5} name="district" value={72}>Тюменская область,72</RadioItem>
            <RadioItem bind:group={district5} name="district" value={86}>Ханты-Мансийский автономный округ,86</RadioItem>
            <RadioItem bind:group={district5} name="district" value={89}>Ямало-Ненецкий автономный округ,89</RadioItem>
            <RadioItem bind:group={district5} name="district" value={64}>Саратовская область,64</RadioItem>
            <RadioItem bind:group={district5} name="district" value={74}>Челябинская область,74</RadioItem>
        {:else if district === 6}
            <RadioItem bind:group={district6} name="district" value={4}>Республика Алтай,4</RadioItem>
            <RadioItem bind:group={district6} name="district" value={3}>Республика Бурятия,3</RadioItem>
            <RadioItem bind:group={district6} name="district" value={17}>Республика Тыва,17</RadioItem>
            <RadioItem bind:group={district6} name="district" value={19}>Республика Хакасия,19</RadioItem>
            <RadioItem bind:group={district6} name="district" value={22}>Алтайский край,22</RadioItem>
            <RadioItem bind:group={district6} name="district" value={75}>Забайкальский край,75</RadioItem>
            <RadioItem bind:group={district6} name="district" value={24}>Красноярский край,24</RadioItem>
            <RadioItem bind:group={district6} name="district" value={38}>Иркутская область,38</RadioItem>
            <RadioItem bind:group={district6} name="district" value={42}>Кемеровская область,42</RadioItem>
            <RadioItem bind:group={district6} name="district" value={54}>Новосибирская область,54</RadioItem>
            <RadioItem bind:group={district6} name="district" value={55}>Омская область,55</RadioItem>
            <RadioItem bind:group={district6} name="district" value={70}>Томская область,70</RadioItem>
        {:else if district === 7}
            <RadioItem bind:group={district7} name="district" value={14}>Республика Саха (Якутия),14</RadioItem>
            <RadioItem bind:group={district7} name="district" value={41}>Камчатский край,41</RadioItem>
            <RadioItem bind:group={district7} name="district" value={25}>Приморский край,25</RadioItem>
            <RadioItem bind:group={district7} name="district" value={27}>Хабаровский край,27</RadioItem>
            <RadioItem bind:group={district7} name="district" value={28}>Амурская область,28</RadioItem>
            <RadioItem bind:group={district7} name="district" value={49}>Магаданская область,49</RadioItem>
            <RadioItem bind:group={district7} name="district" value={65}>Сахалинская область,65</RadioItem>
            <RadioItem bind:group={district7} name="district" value={79}>Еврейская автономная область,79</RadioItem>
            <RadioItem bind:group={district7} name="district" value={87}>Чукотский автономный округ,87</RadioItem>
        {/if}
        </div>
    </div>
</div>