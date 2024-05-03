export default interface ChartData {
  labels: string[]
  datasets: {
    data: string[];
    backgroundColor: string[];
  }
}