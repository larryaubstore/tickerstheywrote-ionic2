import { Component }    from '@angular/core';

import { HomePage }     from '../home/home';
import { AboutPage }    from '../about/about';
import { ContactPage }  from '../contact/contact';
import { SearchPage }   from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = SearchPage;

  constructor() {

  }
}
