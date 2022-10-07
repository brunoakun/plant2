import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  titulo: string = environment.titulo;

  constructor(private scroll: ViewportScroller) {}

  ngOnInit(): void {
  }

  public scrollTo(elementId: string): void { 
    this.scroll.scrollToAnchor(elementId);
}

}
