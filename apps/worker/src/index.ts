import { runGenerationWorkflow } from "./orchestrator.js";

async function main() {
  const result = await runGenerationWorkflow({
    type: "instagram",
    url: "https://instagram.com/example",
  });

  console.log("Workflow result:", result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
