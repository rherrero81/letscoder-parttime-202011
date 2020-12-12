 
import operationRoutes from "./operation/routes";
import searchRoutes from "./search/routes";
import valuesRoutes from "./values/routes";
import signalRoutes from "./signals/routes"

export default [...operationRoutes,...searchRoutes,...valuesRoutes,...signalRoutes];