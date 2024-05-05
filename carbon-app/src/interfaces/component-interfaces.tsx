export default interface ChartData {
  labels: string[]
  datasets: {
    data: string[];
    backgroundColor: string[];
  }
}

export interface PaginationComponent {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange?: any;
}