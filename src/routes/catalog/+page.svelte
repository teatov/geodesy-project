<script>
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
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

<div class="grid grid-cols-3 gap-4 place-items-start">
    <RadioItem bind:group={district} name="district" value={1}>Центральный федеральный округ</RadioItem>
    <RadioItem bind:group={district} name="district" value={2}>Северо-Западный федеральный округ</RadioItem>
    <RadioItem bind:group={district} name="district" value={3}>Южный федеральный округ</RadioItem>
    <RadioItem bind:group={district} name="district" value={4}>Приволжский федеральный округ</RadioItem>
    <RadioItem bind:group={district} name="district" value={5}>Уральский федеральный округ</RadioItem>
    <RadioItem bind:group={district} name="district" value={6}>Сибирский федеральный округ</RadioItem>
    <RadioItem bind:group={district} name="district" value={7}>Дальневосточный федеральный округ</RadioItem>
    <RadioItem bind:group={district} name="district" value={8}>Северо-Кавказский федеральный округ</RadioItem>
    <RadioItem bind:group={district} name="district" value={9}>Прочее</RadioItem>
</div>

<div>
    {#if district === 1}
        <!-- <RadioGroup> -->
            <RadioItem bind:group={district1} name="district" value="1">1,Белгородская область,31</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Брянская область,32</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Владимирская область,33</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Воронежская область,36</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Ивановская область,37</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Калужская область,40</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Костромская область,44</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Курская область,46</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Липецкая область,48</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Московская область,50</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Орловская область,57</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2">1,Рязанская область,62</RadioItem>
            <RadioItem bind:group={district1} name="district" value="2"></RadioItem>
            <RadioItem bind:group={district1} name="district" value="2"></RadioItem>
            <RadioItem bind:group={district1} name="district" value="2"></RadioItem>
            <RadioItem bind:group={district1} name="district" value="2"></RadioItem>
            <RadioItem bind:group={district1} name="district" value="2"></RadioItem>
            <RadioItem bind:group={district1} name="district" value="2"></RadioItem>
        <!-- </RadioGroup> -->
    {:else if district == 2}
        <RadioGroup active="variant-filled-primary">
            <RadioItem bind:group={district1} name="form" value="1">Деревянная</RadioItem>
            <RadioItem bind:group={district1} name="form" value="2">Металлическая</RadioItem>
        </RadioGroup>
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={district1} name="form" value="1">Трехгранная</RadioItem>
            <RadioItem bind:group={district1} name="form" value="2">Четырехгранная</RadioItem>
        </RadioGroup>
    {:else if district == 3}
        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={district1} name="form" value="1">Деревянный</RadioItem>
            <RadioItem bind:group={district1} name="form" value="2">Металлическй</RadioItem>
        </RadioGroup>
        <RadioGroup class = "form_shtativ" active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={district1} name="form" value="1">Трехгранный</RadioItem>
            <RadioItem bind:group={district1} name="form" value="2">Четырехгранный</RadioItem>
        </RadioGroup>
    {:else if district == 4}
        <RadioGroup class = "form_tur" active="variant-filled-primary" hover="hover:variant-soft-primary">
            <RadioItem bind:group={district1} name="form" value="1">Бетонный</RadioItem>
            <RadioItem bind:group={district1} name="form" value="2">Каменный</RadioItem>
            <RadioItem bind:group={district1} name="form" value="3">Кирпичный</RadioItem>
        </RadioGroup>
    {/if}
</div>