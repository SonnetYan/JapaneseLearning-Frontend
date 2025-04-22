 <!-- 平假名和片假名学习卡片 -->
<template>
  <div class="kana-controls">
    <div class="kana-filter">
      <button 
        @click="setKanaType('hiragana')" 
        :class="{ active: kanaType === 'hiragana' }"
      >
        平假名
      </button>
      <button 
        @click="setKanaType('katakana')" 
        :class="{ active: kanaType === 'katakana' }"
      >
        片假名
      </button>
      <button
        @click="toggleDirection()"
        :class="{ active: showRomajiFirst }"
        class="direction-toggle"
      >
        <span class="switch-icon">⇄</span> {{ showRomajiFirst ? '罗马音 → 假名' : '假名 → 罗马音' }}
      </button>
      <button
        @click="toggleAudio()"
        :class="{ active: audioEnabled }"
        class="audio-toggle"
      >
        <span class="audio-icon">{{ audioEnabled ? '🔊' : '🔇' }}</span> {{ audioEnabled ? '发音开启' : '发音关闭' }}
      </button>
    </div>
  </div>

  <div class="row-selector">

    <div class="row-filter">
        <button @click="selectAllRows" :class="{ active: selectedRows.length === 0 }">
        ALL
      </button>
      <button 
        v-for="row in rows" 
        :key="row.id" 
        @click="selectSingleRow(row.id)"
        :class="{ active: selectedRows.includes(row.id) }"
      >
        {{ showRomajiFirst ? row.romajiName : row.name }}
      </button>

    </div>
  </div>

  <div class="kana-table-container">
    <table class="kana-table">
      <thead>
        <tr>
          <th></th>
          <th>a</th>
          <th>i</th>
          <th>u</th>
          <th>e</th>
          <th>o</th>
        </tr>
      </thead>
      <tbody>
        <!-- あ行 (a) -->
        <tr v-show="shouldShowRow('a')">
          <th>{{ showRomajiFirst ? 'A' : 'あ' }}</th>
          <td v-for="sound in ['a', 'i', 'u', 'e', 'o']" :key="sound">
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('a', sound).character] }"
              @click="flipCard(getKana('a', sound).character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('a', sound).character }}</div>
                  <div class="romaji" v-else>{{ getKana('a', sound).romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('a', sound).romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('a', sound).character }}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        
        <!-- か行 (k) -->
        <tr v-show="shouldShowRow('k')">
          <th>{{ showRomajiFirst ? 'K' : 'か' }}</th>
          <td v-for="sound in ['a', 'i', 'u', 'e', 'o']" :key="sound">
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('k', sound).character] }"
              @click="flipCard(getKana('k', sound).character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('k', sound).character }}</div>
                  <div class="romaji" v-else>{{ getKana('k', sound).romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('k', sound).romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('k', sound).character }}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        
        <!-- さ行 (s) -->
        <tr v-show="shouldShowRow('s')">
          <th>{{ showRomajiFirst ? 'S' : 'さ' }}</th>
          <td v-for="sound in ['a', 'i', 'u', 'e', 'o']" :key="sound">
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('s', sound).character] }"
              @click="flipCard(getKana('s', sound).character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('s', sound).character }}</div>
                  <div class="romaji" v-else>{{ getKana('s', sound).romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('s', sound).romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('s', sound).character }}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        
        <!-- た行 (t) -->
        <tr v-show="shouldShowRow('t')">
          <th>{{ showRomajiFirst ? 'T' : 'た' }}</th>
          <td v-for="sound in ['a', 'i', 'u', 'e', 'o']" :key="sound">
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('t', sound).character] }"
              @click="flipCard(getKana('t', sound).character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('t', sound).character }}</div>
                  <div class="romaji" v-else>{{ getKana('t', sound).romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('t', sound).romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('t', sound).character }}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        
        <!-- な行 (n) -->
        <tr v-show="shouldShowRow('n')">
          <th>{{ showRomajiFirst ? 'N' : 'な' }}</th>
          <td v-for="sound in ['a', 'i', 'u', 'e', 'o']" :key="sound">
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('n', sound).character] }"
              @click="flipCard(getKana('n', sound).character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('n', sound).character }}</div>
                  <div class="romaji" v-else>{{ getKana('n', sound).romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('n', sound).romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('n', sound).character }}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        
        <!-- は行 (h) -->
        <tr v-show="shouldShowRow('h')">
          <th>{{ showRomajiFirst ? 'H' : 'は' }}</th>
          <td v-for="sound in ['a', 'i', 'u', 'e', 'o']" :key="sound">
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('h', sound).character] }"
              @click="flipCard(getKana('h', sound).character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('h', sound).character }}</div>
                  <div class="romaji" v-else>{{ getKana('h', sound).romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('h', sound).romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('h', sound).character }}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        
        <!-- ま行 (m) -->
        <tr v-show="shouldShowRow('m')">
          <th>{{ showRomajiFirst ? 'M' : 'ま' }}</th>
          <td v-for="sound in ['a', 'i', 'u', 'e', 'o']" :key="sound">
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('m', sound).character] }"
              @click="flipCard(getKana('m', sound).character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('m', sound).character }}</div>
                  <div class="romaji" v-else>{{ getKana('m', sound).romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('m', sound).romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('m', sound).character }}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        
        <!-- や行 (y) -->
        <tr v-show="shouldShowRow('y')">
          <th>{{ showRomajiFirst ? 'Y' : 'や' }}</th>
          <td>
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('y', 'a').character] }"
              @click="flipCard(getKana('y', 'a').character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('y', 'a').character }}</div>
                  <div class="romaji" v-else>{{ getKana('y', 'a').romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('y', 'a').romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('y', 'a').character }}</div>
                </div>
              </div>
            </div>
          </td>
          <td></td>
          <td>
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('y', 'u').character] }"
              @click="flipCard(getKana('y', 'u').character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('y', 'u').character }}</div>
                  <div class="romaji" v-else>{{ getKana('y', 'u').romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('y', 'u').romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('y', 'u').character }}</div>
                </div>
              </div>
            </div>
          </td>
          <td></td>
          <td>
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('y', 'o').character] }"
              @click="flipCard(getKana('y', 'o').character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('y', 'o').character }}</div>
                  <div class="romaji" v-else>{{ getKana('y', 'o').romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('y', 'o').romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('y', 'o').character }}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        
        <!-- ら行 (r) -->
        <tr v-show="shouldShowRow('r')">
          <th>{{ showRomajiFirst ? 'R' : 'ら' }}</th>
          <td v-for="sound in ['a', 'i', 'u', 'e', 'o']" :key="sound">
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('r', sound).character] }"
              @click="flipCard(getKana('r', sound).character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('r', sound).character }}</div>
                  <div class="romaji" v-else>{{ getKana('r', sound).romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('r', sound).romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('r', sound).character }}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        
        <!-- わ行 (w) -->
        <tr v-show="shouldShowRow('w')">
          <th>{{ showRomajiFirst ? 'W' : 'わ' }}</th>
          <td>
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('w', 'a').character] }"
              @click="flipCard(getKana('w', 'a').character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('w', 'a').character }}</div>
                  <div class="romaji" v-else>{{ getKana('w', 'a').romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('w', 'a').romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('w', 'a').character }}</div>
                </div>
              </div>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getKana('w', 'o').character] }"
              @click="flipCard(getKana('w', 'o').character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getKana('w', 'o').character }}</div>
                  <div class="romaji" v-else>{{ getKana('w', 'o').romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getKana('w', 'o').romaji }}</div>
                  <div class="kana-character" v-else>{{ getKana('w', 'o').character }}</div>
                </div>
              </div>
            </div>
          </td>
        </tr>
        
        <!-- ん (n-special) -->
        <tr v-show="shouldShowRow('x')">
          <th>{{ showRomajiFirst ? 'N' : 'ん' }}</th>
          <td></td>
          <td></td>
          <td>
            <div 
              class="kana-cell" 
              :class="{ flipped: flippedCards[getNSpecial().character] }"
              @click="flipCard(getNSpecial().character)"
            >
              <div class="card-inner">
                <div class="card-front">
                  <div class="kana-character" v-if="!showRomajiFirst">{{ getNSpecial().character }}</div>
                  <div class="romaji" v-else>{{ getNSpecial().romaji }}</div>
                </div>
                <div class="card-back">
                  <div class="romaji" v-if="!showRomajiFirst">{{ getNSpecial().romaji }}</div>
                  <div class="kana-character" v-else>{{ getNSpecial().character }}</div>
                </div>
              </div>
            </div>
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'KanaCard',
  data() {
    return {
      kanaType: 'hiragana',
      showRomajiFirst: false,
      flippedCards: reactive({}),
      selectedRows: [],
      audioEnabled: true,
      audio: null,
      rows: [
        { id: 'a', name: 'あ行', romajiName: 'A' },
        { id: 'k', name: 'か行', romajiName: 'K' },
        { id: 's', name: 'さ行', romajiName: 'S' },
        { id: 't', name: 'た行', romajiName: 'T' },
        { id: 'n', name: 'な行', romajiName: 'N' },
        { id: 'h', name: 'は行', romajiName: 'H' },
        { id: 'm', name: 'ま行', romajiName: 'M' },
        { id: 'y', name: 'や行', romajiName: 'Y' },
        { id: 'r', name: 'ら行', romajiName: 'R' },
        { id: 'w', name: 'わ行', romajiName: 'W' },
        { id: 'x', name: 'ん', romajiName: 'N special' }
      ],
      hiragana: [
        // あ行
        { character: 'あ', romaji: 'a', row: 'a', column: 'a' },
        { character: 'い', romaji: 'i', row: 'a', column: 'i' },
        { character: 'う', romaji: 'u', row: 'a', column: 'u' },
        { character: 'え', romaji: 'e', row: 'a', column: 'e' },
        { character: 'お', romaji: 'o', row: 'a', column: 'o' },
        // か行
        { character: 'か', romaji: 'ka', row: 'k', column: 'a' },
        { character: 'き', romaji: 'ki', row: 'k', column: 'i' },
        { character: 'く', romaji: 'ku', row: 'k', column: 'u' },
        { character: 'け', romaji: 'ke', row: 'k', column: 'e' },
        { character: 'こ', romaji: 'ko', row: 'k', column: 'o' },
        // さ行
        { character: 'さ', romaji: 'sa', row: 's', column: 'a' },
        { character: 'し', romaji: 'shi', row: 's', column: 'i' },
        { character: 'す', romaji: 'su', row: 's', column: 'u' },
        { character: 'せ', romaji: 'se', row: 's', column: 'e' },
        { character: 'そ', romaji: 'so', row: 's', column: 'o' },
        // た行
        { character: 'た', romaji: 'ta', row: 't', column: 'a' },
        { character: 'ち', romaji: 'chi', row: 't', column: 'i' },
        { character: 'つ', romaji: 'tsu', row: 't', column: 'u' },
        { character: 'て', romaji: 'te', row: 't', column: 'e' },
        { character: 'と', romaji: 'to', row: 't', column: 'o' },
        // な行
        { character: 'な', romaji: 'na', row: 'n', column: 'a' },
        { character: 'に', romaji: 'ni', row: 'n', column: 'i' },
        { character: 'ぬ', romaji: 'nu', row: 'n', column: 'u' },
        { character: 'ね', romaji: 'ne', row: 'n', column: 'e' },
        { character: 'の', romaji: 'no', row: 'n', column: 'o' },
        // は行
        { character: 'は', romaji: 'ha', row: 'h', column: 'a' },
        { character: 'ひ', romaji: 'hi', row: 'h', column: 'i' },
        { character: 'ふ', romaji: 'fu', row: 'h', column: 'u' },
        { character: 'へ', romaji: 'he', row: 'h', column: 'e' },
        { character: 'ほ', romaji: 'ho', row: 'h', column: 'o' },
        // ま行
        { character: 'ま', romaji: 'ma', row: 'm', column: 'a' },
        { character: 'み', romaji: 'mi', row: 'm', column: 'i' },
        { character: 'む', romaji: 'mu', row: 'm', column: 'u' },
        { character: 'め', romaji: 'me', row: 'm', column: 'e' },
        { character: 'も', romaji: 'mo', row: 'm', column: 'o' },
        // や行
        { character: 'や', romaji: 'ya', row: 'y', column: 'a' },
        { character: 'ゆ', romaji: 'yu', row: 'y', column: 'u' },
        { character: 'よ', romaji: 'yo', row: 'y', column: 'o' },
        // ら行
        { character: 'ら', romaji: 'ra', row: 'r', column: 'a' },
        { character: 'り', romaji: 'ri', row: 'r', column: 'i' },
        { character: 'る', romaji: 'ru', row: 'r', column: 'u' },
        { character: 'れ', romaji: 're', row: 'r', column: 'e' },
        { character: 'ろ', romaji: 'ro', row: 'r', column: 'o' },
        // わ行
        { character: 'わ', romaji: 'wa', row: 'w', column: 'a' },
        { character: 'を', romaji: 'wo', row: 'w', column: 'o' },
        // ん
        { character: 'ん', romaji: 'n', row: 'x', column: 'special' }
      ],
      katakana: [
        // ア行
        { character: 'ア', romaji: 'a', row: 'a', column: 'a' },
        { character: 'イ', romaji: 'i', row: 'a', column: 'i' },
        { character: 'ウ', romaji: 'u', row: 'a', column: 'u' },
        { character: 'エ', romaji: 'e', row: 'a', column: 'e' },
        { character: 'オ', romaji: 'o', row: 'a', column: 'o' },
        // カ行
        { character: 'カ', romaji: 'ka', row: 'k', column: 'a' },
        { character: 'キ', romaji: 'ki', row: 'k', column: 'i' },
        { character: 'ク', romaji: 'ku', row: 'k', column: 'u' },
        { character: 'ケ', romaji: 'ke', row: 'k', column: 'e' },
        { character: 'コ', romaji: 'ko', row: 'k', column: 'o' },
        // サ行
        { character: 'サ', romaji: 'sa', row: 's', column: 'a' },
        { character: 'シ', romaji: 'shi', row: 's', column: 'i' },
        { character: 'ス', romaji: 'su', row: 's', column: 'u' },
        { character: 'セ', romaji: 'se', row: 's', column: 'e' },
        { character: 'ソ', romaji: 'so', row: 's', column: 'o' },
        // タ行
        { character: 'タ', romaji: 'ta', row: 't', column: 'a' },
        { character: 'チ', romaji: 'chi', row: 't', column: 'i' },
        { character: 'ツ', romaji: 'tsu', row: 't', column: 'u' },
        { character: 'テ', romaji: 'te', row: 't', column: 'e' },
        { character: 'ト', romaji: 'to', row: 't', column: 'o' },
        // ナ行
        { character: 'ナ', romaji: 'na', row: 'n', column: 'a' },
        { character: 'ニ', romaji: 'ni', row: 'n', column: 'i' },
        { character: 'ヌ', romaji: 'nu', row: 'n', column: 'u' },
        { character: 'ネ', romaji: 'ne', row: 'n', column: 'e' },
        { character: 'ノ', romaji: 'no', row: 'n', column: 'o' },
        // ハ行
        { character: 'ハ', romaji: 'ha', row: 'h', column: 'a' },
        { character: 'ヒ', romaji: 'hi', row: 'h', column: 'i' },
        { character: 'フ', romaji: 'fu', row: 'h', column: 'u' },
        { character: 'ヘ', romaji: 'he', row: 'h', column: 'e' },
        { character: 'ホ', romaji: 'ho', row: 'h', column: 'o' },
        // マ行
        { character: 'マ', romaji: 'ma', row: 'm', column: 'a' },
        { character: 'ミ', romaji: 'mi', row: 'm', column: 'i' },
        { character: 'ム', romaji: 'mu', row: 'm', column: 'u' },
        { character: 'メ', romaji: 'me', row: 'm', column: 'e' },
        { character: 'モ', romaji: 'mo', row: 'm', column: 'o' },
        // ヤ行
        { character: 'ヤ', romaji: 'ya', row: 'y', column: 'a' },
        { character: 'ユ', romaji: 'yu', row: 'y', column: 'u' },
        { character: 'ヨ', romaji: 'yo', row: 'y', column: 'o' },
        // ラ行
        { character: 'ラ', romaji: 'ra', row: 'r', column: 'a' },
        { character: 'リ', romaji: 'ri', row: 'r', column: 'i' },
        { character: 'ル', romaji: 'ru', row: 'r', column: 'u' },
        { character: 'レ', romaji: 're', row: 'r', column: 'e' },
        { character: 'ロ', romaji: 'ro', row: 'r', column: 'o' },
        // ワ行
        { character: 'ワ', romaji: 'wa', row: 'w', column: 'a' },
        { character: 'ヲ', romaji: 'wo', row: 'w', column: 'o' },
        // ン
        { character: 'ン', romaji: 'n', row: 'x', column: 'special' }
      ]
    };
  },
  computed: {
    isAllSelected() {
      return this.selectedRows.length === this.rows.length;
    },
    rowIds() {
      return this.rows.map(row => row.id);
    }
  },
  methods: {
    shouldShowRow(rowId) {
      // 如果没有选中任何行，则显示所有行
      // 如果选中了某些行，则只显示被选中的行
      return this.selectedRows.length === 0 || this.selectedRows.includes(rowId);
    },
    getKana(row, column) {
      const kanaSet = this.kanaType === 'hiragana' ? this.hiragana : this.katakana;
      return kanaSet.find(kana => kana.row === row && kana.column === column) || { character: '', romaji: '' };
    },
    getNSpecial() {
      const kanaSet = this.kanaType === 'hiragana' ? this.hiragana : this.katakana;
      return kanaSet.find(kana => kana.row === 'x') || { character: '', romaji: '' };
    },
    flipCard(character) {
      if (!character) return;
      
      this.playKanaAudio(this.getKanaRomaji(character));
      
      this.flippedCards[character] = !this.flippedCards[character];
      
      // 自动翻回卡片
      setTimeout(() => {
        this.flippedCards[character] = false;
      }, 800);
    },
    setKanaType(type) {
      this.kanaType = type;
      // 清空flippedCards对象
      Object.keys(this.flippedCards).forEach(key => {
        delete this.flippedCards[key];
      });
    },
    toggleDirection() {
      this.showRomajiFirst = !this.showRomajiFirst;
      // 清空flippedCards对象
      Object.keys(this.flippedCards).forEach(key => {
        delete this.flippedCards[key];
      });
    },
    selectSingleRow(rowId) {
      if (this.selectedRows.includes(rowId)) {
        // If the row is already selected, unselect all rows
        this.selectedRows = [];
      } else {
        // Select only this row (clearing any previously selected rows)
        this.selectedRows = [rowId];
      }
    },
    selectAllRows() {
      // If there are any rows selected, clear the selection
      // This will show all rows
      this.selectedRows = [];
      
      // 清空flippedCards对象
      Object.keys(this.flippedCards).forEach(key => {
        delete this.flippedCards[key];
      });
    },
    toggleAudio() {
      this.audioEnabled = !this.audioEnabled;
      // 如果关闭音频，停止当前播放的音频
      if (!this.audioEnabled && this.audio) {
        this.audio.pause();
        this.audio = null;
      }
    },
    getKanaRomaji(character) {
      const kanaSet = this.kanaType === 'hiragana' ? this.hiragana : this.katakana;
      const kana = kanaSet.find(k => k.character === character);
      return kana ? kana.romaji : '';
    },
    playKanaAudio(romaji) {
      // 如果音频功能关闭或没有罗马音，不播放
      if (!this.audioEnabled || !romaji) return;
      
      // 停止当前播放的音频
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }
      
      // 处理特殊发音情况
      let audioFileName = romaji;
      // 特殊处理某些罗马音与音频文件的对应关系
      switch(romaji) {
        case 'shi': audioFileName = 'shi'; break;
        case 'chi': audioFileName = 'chi'; break;
        case 'tsu': audioFileName = 'tsu'; break;
        // 其他特殊情况...
      }
      
      try {
        // 创建音频对象并播放
        this.audio = new Audio(`/audio/kana/${audioFileName}.mp3`);
        
        // 添加错误处理
        this.audio.onerror = (e) => {
          console.error('音频播放错误:', e);
          console.error('尝试播放:', `/audio/kana/${audioFileName}.mp3`);
        };
        
        // 播放音频
        this.audio.play().catch(e => {
          console.error('无法播放音频:', e);
        });
      } catch (e) {
        console.error('音频创建错误:', e);
      }
    }
  }
};
</script>

<style scoped>
.kana-table-container {
  max-width: 800px;
  margin: 20px auto;
  overflow-x: auto;
}

.kana-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff8f8;
  border: 1px solid #ddd;
}

.kana-table th, .kana-table td {
  padding: 5px;
  text-align: center;
  border: 1px solid #eee;
}

.kana-table thead th {
  background-color: #f5f5f5;
  font-weight: normal;
  color: #666;
}

.kana-table tbody th {
  background-color: #f5f5f5;
  font-weight: normal;
  width: 40px;
}

.kana-cell {
  width: 70px;
  height: 70px;
  margin: 0 auto;
  perspective: 1000px;
  cursor: pointer;
  user-select: none;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
}

.kana-cell.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.card-front {
  background-color: #ffe0e0;
  color: #333;
}

.card-back {
  background-color: #e0f0ff;
  color: #333;
  transform: rotateY(180deg);
}

.kana-character {
  font-size: 28px;
  font-weight: bold;
}

.romaji {
  font-size: 22px;
  font-weight: bold;
}

.kana-controls, .row-selector {
  margin: 20px auto;
  max-width: 800px;
}

.kana-filter, .row-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 15px;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #ddd;
}

button.active {
  background-color: #4CAF50;
  color: white;
}

.direction-toggle {
  margin-left: 20px;
  background-color: #ff9800;
  color: white;
}

.direction-toggle:hover {
  background-color: #f57c00;
}

.direction-toggle.active {
  background-color: #2196F3;
}

.no-selection-message {
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 18px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px auto;
  max-width: 800px;
}

.switch-icon {
  margin-right: 5px;
  font-weight: bold;
  font-size: 16px;
}

.audio-toggle {
  margin-left: 10px;
  background-color: var(--kageyama-blue, #1A3263);
  color: white;
}

.audio-toggle:hover {
  background-color: var(--hinata-orange, #F5A623);
}

.audio-toggle.active {
  background-color: var(--hinata-orange, #F5A623);
  color: white;
}

.audio-icon {
  margin-right: 5px;
  font-size: 16px;
}
</style> 