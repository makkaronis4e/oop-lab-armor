import {BlacksmithShop} from "./scripts/BlacksmithShop";

main();
declare global {
    interface Window {
        shop: any;
    }
}

function main() {
    $(function () {
        start(new BlacksmithShop());
    });
}

function start(shop: BlacksmithShop) {
    const forgeResourcesList = $("#forge-resources-list");
    const armorTable = $("#armor-table");

    $("#resources-form").on("submit", (event) => {
        if (shop.getResourcesCount() > 2) {
            showWarning("Max resources count reached");
        } else {
            const resourceInputValue = $("#resource-name-input").val() as string;
            const countInputValue = $("#count").val() as number;
            forgeResourcesList.append(createResourceListItem(resourceInputValue, countInputValue));
            shop.addResource(resourceInputValue, countInputValue);
        }
        event.preventDefault();
    });

    $("#props-form").on("submit", (event) => {
        if (shop.getResourcesCount() < 1) {
            showWarning("Forge is empty");
        } else {
            const gradeInputValue = $("#grade").val() as string;
            const typeInputValue = $("#type").val() as string;
            shop.setArmorType(typeInputValue.toLowerCase());
            shop.setGrade(gradeInputValue);
            const armorItem = shop.craftArmor();
            armorTable.prepend(createArmorListItem(armorItem));
            clearForge();
        }
        event.preventDefault();
    });

    $("#clear-forge-button").on("click", (event) => {
        clearForge();
        event.preventDefault();
    })

    $("#clear-armor-list-button").on("click", (event) => {
        shop.clearArmorList();
        armorTable.empty();
        event.preventDefault();
    })

    $(".sort-header").each((key, el) => {
        const qEl =  $(el);
        qEl.on("click", (event) => {
           const sorted = shop.sortArmorList(qEl.data("value"));
           armorTable.empty();
           sorted.forEach(item => {
               armorTable.prepend(createArmorListItem(item));
           })
        })
    });

    $("#select-grade").on("change", (key, el) => {
        const optionSelected = $("#select-grade option:selected").val();
        const sorted = shop.filterList(optionSelected === "all" ? null : {grade: optionSelected});
        armorTable.empty();
        sorted.forEach(item => {
            armorTable.prepend(createArmorListItem(item));
        })
    });


    function clearForge() {
        shop.clearForge();
        forgeResourcesList.empty();
    }

}

function generateLIst() {

}

function showWarning(text: string): void {
   let visible: boolean;
   return (() => {
       if (!visible) {
           $("body").prepend(`<div class="mt-2 alert alert-danger" style="position: fixed; left: 0; right: 0" id="alert" role="alert">${text}</div>`);
           visible = true;
           setTimeout(() => {
              const node = $("#alert");
              if (node) {
                  node.remove();
                  visible = false;
              }
           }, 3000)
       }
   })();
}

function createResourceListItem(name: string, count: number): string {
    return `
       <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <h6 class="my-0">${name}</h6>
            </div>
            <span class="text-muted">${count}</span>
        </li>
      `
}

function createArmorListItem(armorItem: any): string {
    return `
     <tr>
        <td>${armorItem.type}</td>
        <td>${armorItem.grade}</td>
        <td>${armorItem.price}</td>
        <td>${armorItem.weight}</td>
        <td>${armorItem.attackSpeed}</td>
        <td>${armorItem.attackPower}</td>
        <td>${armorItem.healthPoints}</td>
        <td>${armorItem.healthRegeneration}</td>
        <td>${armorItem.manaPoints}</td>
        <td>${armorItem.manaRegen}</td>
        <td>${armorItem.speed}</td>
        <td>${armorItem.spellPower}</td>
        <td>${armorItem.castingSpeed}</td>
        <td>${armorItem.armor}</td>
        <td>${armorItem.magicResistance}</td>
    </tr>
    `
}