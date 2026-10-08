import { useState } from "react";

function RecipeCard({ recipe }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    const name = recipe[`strIngredient${number}`]?.trim();
    const measure = recipe[`strMeasure${number}`]?.trim();

    return name ? { name, measure } : null;
  }).filter(Boolean);

  return (
    <article className={`recipe-card${isExpanded ? " is-expanded" : ""}`}>
      <div className="recipe-image">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} loading="lazy" />
        {recipe.strCategory && (
          <span className="recipe-category">{recipe.strCategory}</span>
        )}
      </div>
      <div className="recipe-content">
        <div className="recipe-meta">
          {recipe.strArea && <span>{recipe.strArea} cuisine</span>}
        </div>
        <h3>{recipe.strMeal}</h3>
        <button
          className="recipe-toggle"
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {isExpanded ? "Hide details" : "View ingredients and directions"}
          <span className="toggle-icon" aria-hidden="true">
            {isExpanded ? "−" : "+"}
          </span>
        </button>
        {isExpanded && (
          <section
            className="recipe-details"
            aria-label={`تفاصيل ${recipe.strMeal}`}
          >
            {ingredients.length > 0 && (
              <section className="ingredients">
                <h4>المكونات</h4>
                <ul className="ingredient-list">
                  {ingredients.map(({ name, measure }, index) => (
                    <li key={`${name}-${index}`} className="ingredient-pill">
                      <span>{name}</span>
                      {measure && (
                        <span className="ingredient-measure">{measure}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="instructions">
              <h4>طريقة التحضير</h4>
              <p className="recipe-instructions">
                {recipe.strInstructions || "لا تتوفر طريقة تحضير لهذه الوصفة."}
              </p>
            </section>
          </section>
        )}
      </div>
    </article>
  );
}

export default RecipeCard;
